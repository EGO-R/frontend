export interface Video {
    id: number;
    name: string;
    preview: string;
    author: {
        id: number;
        name: string;
    };
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

    const res = await fetch(url);

    if (!res.ok) {
        throw new Error('Ошибка при загрузке видео');
    }

    return res.json();
}
