import {fetchWithAuth} from "@/api/fetchWithAuth";

export interface AuthRequest {
    email: string;
    password: string;
}

export interface UserDto {
    id: number;
    email: string;
    name: string;
}

export interface AuthResponse {
    token: string;
    user: UserDto;
}

export async function register(authData: AuthRequest): Promise<AuthResponse> {
    const res = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(authData),
    });

    if (!res.ok) {
        throw new Error('Ошибка регистрации');
    }

    return res.json();
}

export async function login(authData: AuthRequest): Promise<AuthResponse> {
    const res = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(authData),
    });

    if (!res.ok) {
        throw new Error('Ошибка авторизации');
    }

    return res.json();
}
