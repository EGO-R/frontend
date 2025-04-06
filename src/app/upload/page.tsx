'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface VideoFormData {
    name: string;
    preview: string;
    videoFile: File | null;
}

export default function UploadVideo() {
    const router = useRouter();

    const [formData, setFormData] = useState<VideoFormData>({
        name: '',
        preview: '',
        videoFile: null,
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, files } = e.target;
        if (name === 'file' && files) {
            // Обрабатываем выбор файла
            const videoFile = files[0];
            if (videoFile.size > 5 * 1024 * 1024 * 1024) {
                setError('Файл больше 5 ГБ!');
                return;
            }
            setFormData({ ...formData, videoFile: videoFile });
        } else {
            // Обычное текстовое поле
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Создаем FormData и добавляем поля
        const form = new FormData();
        form.append('name', formData.name);
        form.append('preview', formData.preview);
        if (formData.videoFile) {
            form.append('videoFile', formData.videoFile);
        }

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/videos/create`,
                {
                    method: 'POST',
                    body: form,
                }
            );
            setLoading(false);

            if (!response.ok) {
                setError('Ошибка при загрузке видео');
            } else {
                router.push('/');
            }
        } catch (err) {
            setLoading(false);
            setError('Ошибка соединения с сервером.');
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

                <input
                    type="text"
                    name="preview"
                    placeholder="Ссылка на превью"
                    value={formData.preview}
                    onChange={handleChange}
                    className="border p-2 rounded"
                    required
                />

                <input
                    type="file"
                    name="file"
                    accept="video/*"
                    onChange={handleChange}
                    className="border p-2 rounded"
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
