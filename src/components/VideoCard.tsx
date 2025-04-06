import Image from "next/image";
import Link from "next/link";

interface VideoCardProps {
    name: string;
    author: {
        id: number;
        name: string;
    };
    preview: string;
}

export default function VideoCard({ name, author, preview }: VideoCardProps) {
    return (
        <div className="rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <Image
                src={preview}
                alt={name}
                width={640}
                height={360}
                className="w-full"
            />
            <div className="p-4">
                <h3 className="text-lg font-semibold">{name}</h3>
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
