const S3_BASE_URL = process.env.NEXT_PUBLIC_S3_BASE_URL;

export function urlFromBack(key: string): string {
    return `${S3_BASE_URL}/${key}`;
}

export function urlToBack(fullUrl: string): string {
    return fullUrl.replace(`${S3_BASE_URL}/`, '');
}
