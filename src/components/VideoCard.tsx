import Image from 'next/image';
import Link from 'next/link';

interface VideoCardProps {
    id: number;
    name: string;
    author: {
        id: number;
        name: string;
    };
    preview: string;
}

export default function VideoCard({ id, name, author, preview }: VideoCardProps) {
    return (
        <div className="rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
            <Link href={`/video/${id}`} className="block">
                <Image
                    src={preview}
                    alt={name}
                    width={640}
                    height={360}
                    className="w-full"
                />
            </Link>

            <div className="p-4">
                <Link href={`/video/${id}`} className="block">
                    <h3 className="text-lg font-semibold">{name}</h3>
                </Link>
                <Link
                    href={`/channel/${author.id}`}
                    className="text-sm text-gray-500 hover:text-blue-600"
                >
                    {author.name}
                </Link>
            </div>
        </div>
    );
}
