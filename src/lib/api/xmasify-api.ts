export async function xmasify(avatar: Blob, mask: Blob, prompt: string, negativePrompt?: string) {
    const formData = new FormData();
    formData.append('avatar', avatar);
    formData.append('mask', mask);
    formData.append('prompt', prompt);
    if (negativePrompt) {
        formData.append('negative_prompt', negativePrompt);
    }

    try {
        const response = await fetch('/api/xmasify', {
            method: 'POST',
            body: formData
        });
        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }
        return response.blob();
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Fetch request failed: ${error.message}`);
        } else {
            throw new Error('Unknown error occurred during fetch');
        }
    }
}