export async function xmasify(avatar: Blob, mask: Blob, prompt: string) {
    const formData = new FormData();
    formData.append('avatar', avatar);
    formData.append('mask', mask);
    formData.append('prompt', prompt);

    const response = await fetch('/api/xmasify', {
        method: 'POST',
        body: formData
    });
    return response.blob();
}