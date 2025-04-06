'use client';
import Image from "next/image";
import Link from "next/link";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { setUser } from '@/store/userSlice';

export default function Header() {
    const user = useSelector((state: RootState) => state.user.user);
    const dispatch = useDispatch();


    const handleLoginClick = () => {
        dispatch(
            setUser({
                username: 'Travel Channel',
                avatarUrl:
                    'https://storage.yandexcloud.net/alexandrina/avatars/Travel_Channel/avatar.jpeg',
                channelUrl: '/channel/Travel_Channel',
            })
        );
    };

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

                {user ? (
                    <>
                        <Link href="/upload" className="text-blue-600 hover:underline">
                            Загрузить
                        </Link>
                        <Link href={user.channelUrl}>
                            <Image
                                src={user.avatarUrl}
                                alt={user.username}
                                width={40}
                                height={40}
                                className="rounded-full cursor-pointer"
                            />
                        </Link>
                    </>
                ) : (
                    <button
                        onClick={handleLoginClick}
                        className="text-blue-600 hover:underline"
                    >
                        Войти
                    </button>
                )}
            </div>
        </header>
    )
}
