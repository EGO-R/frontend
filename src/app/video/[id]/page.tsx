'use client';
import { useEffect, useState } from 'react';
import { fetchVideoById, Video } from '@/api/videos';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function VideoPage() {
    const params = useParams<{ id: string }>();
    const videoId = Number(params.id);

    const [video, setVideo] = useState<Video | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchVideoById(videoId)
            .then((data) => {
                setVideo(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [videoId]);

    if (loading) return <div className="container mx-auto p-4">Загрузка...</div>;
    if (error) return <div className="container mx-auto p-4">Ошибка: {error}</div>;
    if (!video) return <div className="container mx-auto p-4">Видео не найдено</div>;

    return (
        <main className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">{video.name}</h1>

            <video
                src={video.videoUrl}
                poster={video.preview}
                controls
                className="w-full max-w-4xl rounded shadow-lg"
            >
                Ваш браузер не поддерживает воспроизведение видео.
            </video>

            <div className="mt-4">
                Автор:{' '}
                <Link
                    href={`/channel/${video.author.id}`}
                    className="text-blue-600 hover:underline"
                >
                    {video.author.name}
                </Link>
            </div>
            <div className="mt-6">
                <Link
                    href={`/video/${video.id}/edit`}
                    className="text-blue-500 hover:underline"
                >
                    Редактировать видео
                </Link>
            </div>
        </main>
    );
}
