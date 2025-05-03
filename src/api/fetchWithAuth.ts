import { store } from '@/store/store';

export async function fetchWithAuth(input: RequestInfo, init?: RequestInit) {
    const state = store.getState();
    const token = state.user.token;

    const headers = new Headers(init?.headers || {});
    if (token) {
        headers.set('Authorization', `Bearer ${token}`);
    }

    const response = await fetch(input, { ...init, headers });

    if (response.status === 401) {
        store.dispatch({ type: 'user/clearAuthData' });
        window.location.href = '/login';
        throw new Error('Необходима авторизация');
    }

    return response;
}
