'use client';
import Image from "next/image";
import Link from "next/link";
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

export default function Header() {
    const user = useSelector((state: RootState) => state.user.user);

    return (
        <header className="shadow-sm py-4">
            <div className="container mx-auto flex items-center justify-between px-4">
                {/* Логотип слева */}
                <Link href="/">
                    <Image
                        src="https://storage.yandexcloud.net/alexandrina/logo.png"
                        alt="Alexandrina"
                        width={60}
                        height={60}
                        className="cursor-pointer"
                    />
                </Link>

                {/* Поле поиска */}
                <input
                    type="text"
                    placeholder="Поиск видео..."
                    className="w-full max-w-md px-4 py-2 border border-gray-500 rounded-md shadow-sm"
                />

                <div className="flex items-center space-x-4">
                    {user ? (
                        <>
                            <Link href="/upload" className="text-blue-600 hover:underline">
                                Загрузить
                            </Link>
                            <Link href={`/channel/${user.id}`}>
                                <Image
                                    src={`https://storage.yandexcloud.net/alexandrina/avatars/${user.id}.jpeg`}
                                    alt={user.name}
                                    width={40}
                                    height={40}
                                    className="rounded-full cursor-pointer"
                                />
                            </Link>
                        </>
                    ) : (
                        <Link href="/login" className="text-blue-600 hover:underline">
                            Войти
                        </Link>
                    )}
                </div>
            </div>
        </header>
    )
}
