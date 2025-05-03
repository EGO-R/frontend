import {urlFromBack, urlToBack} from "@/api/urlUtils";
import {fetchWithAuth} from "@/api/fetchWithAuth";

export interface Video {
    id: number;
    name: string;
    preview: string;
    videoUrl: string;
    author: {
        id: number;
        name: string;
    };
}

interface VideoResponse {
    id: number;
    name: string;
    previewKey: string;
    videoKey: string;
    author: {
        id: number;
        name: string;
    };
}

// Функция конвертации из VideoResponse в Video
function mapVideoResponse(video: VideoResponse): Video {
    return {
        id: video.id,
        name: video.name,
        preview: urlFromBack(video.previewKey),
        videoUrl: urlFromBack(video.videoKey),
        author: video.author,
    };
}

// Для массивов
function mapVideoListResponse(videos: VideoResponse[]): Video[] {
    return videos.map(mapVideoResponse);
}

// Пример обновлённой функции запроса одного видео
export async function fetchVideoById(id: number): Promise<Video> {
    const res = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/api/videos/${id}`);

    if (!res.ok) {
        throw new Error('Ошибка загрузки видео');
    }

    const data: VideoResponse = await res.json();
    return mapVideoResponse(data);
}

// получение presigned ссылки
export async function getPresignedUploadUrl(): Promise<string> {
    const res = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/api/videos/upload`);

    if (!res.ok) {
        throw new Error('Не удалось получить ссылку для загрузки видео');
    }

    const data = await res.json();
    return data.url;
}

// редактирование названия
export async function updateVideoName(id: number, name: string) {
    const res = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/api/videos/${id}/update`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
    });

    if (!res.ok) {
        throw new Error('Ошибка обновления названия видео');
    }
}

// удаление видео
export async function deleteVideo(id: number) {
    const res = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/api/videos/${id}`, {
        method: 'DELETE',
    });

    if (!res.ok) {
        throw new Error('Ошибка удаления видео');
    }
}

// Интерфейс для параметров поиска
export interface VideoSearchQuery {
    name?: string;
    authorID?: number;
    paginationOptions?: {
        sortField?: string; // можно сделать enum
        direction?: 'ASC' | 'DESC';
        size?: number;
        lastSelectedValue?: string;
    };
}

export async function createVideo(
    name: string,
    previewFile: File,
    videoUrl: string,
): Promise<Video> {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('preview', previewFile);
    formData.append('videoUrl', urlToBack(videoUrl));

    const res = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/api/videos/create`, {
        method: 'POST',
        body: formData,
    });

    if (!res.ok) {
        throw new Error('Ошибка сохранения видео на сервере');
    }

    return res.json();
}

// Функция генерации query-строки
function buildQuery(params: VideoSearchQuery): string {
    const query = new URLSearchParams();

    if (params.name) query.append('name', params.name);
    if (params.authorID) query.append('authorID', params.authorID.toString());

    if (params.paginationOptions) {
        const { sortField, direction, size, lastSelectedValue } = params.paginationOptions;
        if (sortField) query.append('paginationOptions.sortField', sortField);
        if (direction) query.append('paginationOptions.direction', direction);
        if (size) query.append('paginationOptions.size', size.toString());
        if (lastSelectedValue) query.append('paginationOptions.lastSelectedValue', lastSelectedValue);
    }

    return query.toString();
}

export async function fetchVideos(params?: VideoSearchQuery): Promise<Video[]> {
    let url = `${process.env.NEXT_PUBLIC_API_URL}/api/videos`;

    if (params) {
        const queryString = buildQuery(params);
        url += `?${queryString}`;
    }

    const res = await fetchWithAuth(url);

    if (!res.ok) {
        throw new Error('Ошибка при загрузке видео');
    }

    const data: VideoResponse[] = await res.json();
    return mapVideoListResponse(data);
}
