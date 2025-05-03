import {fetchWithAuth} from "@/api/fetchWithAuth";

export async function uploadFileToS3(presignedUrl: string, file: File) {
    const res = await fetchWithAuth(presignedUrl, {
        method: 'PUT',
        body: file,
        headers: {
            'Content-Type': file.type,
        },
    });

    if (!res.ok) {
        throw new Error('Ошибка загрузки файла в S3');
    }
}
