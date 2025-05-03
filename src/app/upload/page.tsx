'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getPresignedUploadUrl, createVideo } from '@/api/videos';
import { uploadFileToS3 } from '@/api/s3Upload';

interface VideoFormData {
    name: string;
    preview: File | null;
    videoFile: File | null;
}

export default function UploadVideo() {
    const router = useRouter();

    const [formData, setFormData] = useState<VideoFormData>({
        name: '',
        preview: null,
        videoFile: null,
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, files } = e.target;
        if (files && files.length > 0) {
            setFormData({ ...formData, [name]: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (!formData.videoFile || !formData.preview) {
            setError('Заполните все поля и выберите файлы.');
            setLoading(false);
            return;
        }

        if (formData.videoFile.size > 5 * 1024 * 1024 * 1024) {
            setError("Видео не должно превышать 5 ГБ");
            setLoading(false);
            return;
        }


        try {
            // Шаг 1: Получаем presigned URL
            const presignedUrl = await getPresignedUploadUrl();

            // Шаг 2: Загружаем видео в S3
            await uploadFileToS3(presignedUrl, formData.videoFile);

            // Шаг 3: Отправляем VideoCreateDto на бекенд
            const video = await createVideo(formData.name, formData.preview, presignedUrl.split('?')[0]);

            router.push(`/video/${video.id}`);
        } catch (err: any) {
            setError(err.message || 'Ошибка при загрузке видео.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Загрузить новое видео</h1>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4 max-w-lg">
                <input
                    type="text"
                    name="name"
                    placeholder="Название видео"
                    value={formData.name}
                    onChange={handleChange}
                    className="border p-2 rounded"
                    required
                />

                <label className="font-medium">Превью-картинка:</label>
                <input
                    type="file"
                    name="preview"
                    accept="image/*"
                    onChange={handleChange}
                    className="border p-2 rounded"
                    required
                />

                <label className="font-medium">Файл видео (до 5 ГБ):</label>
                <input
                    type="file"
                    name="videoFile"
                    accept="video/*"
                    onChange={handleChange}
                    className="border p-2 rounded"
                    required
                />

                {error && <p className="text-red-600">{error}</p>}

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
                >
                    {loading ? 'Загрузка...' : 'Загрузить'}
                </button>
            </form>
        </main>
    );
}
