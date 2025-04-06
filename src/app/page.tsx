'use client';
import { useEffect, useState } from 'react';
import VideoCard from "@/components/VideoCard";
import { fetchVideos, Video } from "@/api/videos";

export default function Home() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchVideos()  // по умолчанию пустой запрос
        .then(data => {
          setVideos(data);
          setLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setLoading(false);
        });
  }, []);

  if (loading) return <div className="container mx-auto p-4">Загрузка...</div>;
  if (error) return <div className="container mx-auto p-4">Ошибка: {error}</div>;

  return (
      <main className="container mx-auto px-4 py-6">
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map(video => (
              <VideoCard key={video.id} {...video} />
          ))}
        </section>
      </main>
  );
}


function getMockVideos() {
  return [
    {
      id: 1,
      name: "Путешествие в Альпы",
      author: "Travel Channel",
      preview: "https://storage.yandexcloud.net/alexandrina/previews/Travel_Channel/alps.jpeg",
    },
    {
      id: 2,
      name: "Как сварить идеальный кофе",
      author: "Coffee Masters",
      preview: "https://storage.yandexcloud.net/alexandrina/previews/Coffee_Masters/coffee.jpg",
    },
    {
      id: 3,
      name: "Изучить Java за 1 день",
      author: "Code Academy",
      preview: "https://storage.yandexcloud.net/alexandrina/previews/Code_Academy/java.jpg",
    },
  ];
}
