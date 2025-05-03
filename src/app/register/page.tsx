'use client';
import { useState } from 'react';
import { register } from '@/api/auth';
import { useDispatch } from 'react-redux';
import { setAuthData } from '@/store/userSlice';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
    const dispatch = useDispatch();
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await register({ email, password });
            dispatch(setAuthData({ user: response.user, token: response.token }));
            router.push('/');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="container mx-auto px-4 py-8 max-w-md">
            <h1 className="text-2xl font-bold mb-4">Вход</h1>

            <form onSubmit={handleRegister} className="space-y-4">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border rounded p-2 w-full"
                    required
                />
                <input
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border rounded p-2 w-full"
                    required
                />
                {error && <p className="text-red-600">{error}</p>}
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                >
                    {loading ? 'Регистрация...' : 'Зарегистрироваться'}
                </button>
            </form>
        </main>
    );
}
