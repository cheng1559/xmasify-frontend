<script lang="ts">
    import { fade } from 'svelte/transition';
    import { MusicPlayer } from '$lib/components/music-player';
    import { getToastStore } from '@skeletonlabs/skeleton';
    import { FileButton } from '@skeletonlabs/skeleton';
    import { goto } from '$app/navigation';
    import { page } from "$app/state";
    import { onMount } from 'svelte';
    import Cropper from 'svelte-easy-crop';
    // import { getModalStore } from '@skeletonlabs/skeleton';
    // import {AvatarCropper} from "$lib/components/avatar-cropper";
    import {getCroppedImg} from "$lib/components/avatar-cropper/canvasUtils";
    import type { CropArea } from "svelte-easy-crop/dist/types";

    const toastStore = getToastStore();
    // const modalStore = getModalStore();

    const step = $derived(() => {
        const params = page.url.searchParams;
        const stepParam = params.get('step');
        const parsedStep = parseInt(stepParam || '1', 10);
        return isNaN(parsedStep) ? 1 : parsedStep;
    });

    function changeStep(newStep: number) {
        goto(`?step=${newStep}`, { replaceState: true }); // 更新查询参数
    }

    function checkFileIsValid(file: File): boolean {
        const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml', 'image/bmp', 'image/tiff'];
        return validTypes.includes(file.type);
    }


    // const avatarCropper: ModalComponent = { ref: AvatarCropper };
    let croppedAvatar: Blob | null = $state(null);
    let pixelCrop: CropArea | null = $state(null);

    let avatar: string | null = $state(null);
    let avatarFile: Blob | null = $state(null);
    function onChangeHandler(e: Event): void {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (file && checkFileIsValid(file)) {
            console.log('file:', file);
            avatarFile = file;
            avatar = URL.createObjectURL(avatarFile);
            toastStore.trigger({
                message: 'File uploaded!',
                background: 'variant-filled-success'
            });
            (e.target as HTMLInputElement).value = '';
        } else {
            toastStore.trigger({
                message: 'Invalid file type!',
                background: 'variant-filled-error'
            });
        }
    }

    function saveCrop(crop: CustomEvent<{
        percent: CropArea;
        pixels: CropArea;
    }>): void {
        pixelCrop = crop.detail.pixels;
    }

    onMount(() => {
        changeStep(1);
    });

</script>

<div class="h-full w-full flex items-center justify-center relative flex-col bg-primary-500 p-4 gap-3">
    <MusicPlayer />
    <div class="flex-1 w-full bg-surface-500 rounded-3xl shadow-lg relative" transition:fade>
        {#if step() === 1}
            <div class="absolute top-0 left-0 h-full w-full p-8" transition:fade>
                <div class="h-full flex flex-col items-center justify-center">
                    <div class="flex-1 w-full flex items-center justify-center relative ">
                        {#if !croppedAvatar}
                            <div class="rounded-full absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white size-64 sm:size-80 opacity-70"></div>
                            <img src="/images/santa-claus.png" class="w-4/5 max-w-xs relative select-none" alt="" />
                        {:else}
                            <img src={URL.createObjectURL(croppedAvatar)} class="w-4/5 max-w-xs relative rounded-3xl shadow select-none" alt="" />
                        {/if}
                    </div>
                    <div class="w-full mt-6">
                        <h1 class="text-primary-900 text-4xl font-bold text-left select-none">
                            Upload your avatar!
                        </h1>
                        <div class="mt-4 text-surface-900 select-none">
                            Easy to use, just upload your avatar and we will do the rest!
                        </div>
                        <div class="grid mt-12 px-3 grid-cols-2 gap-6 place-items-center">
                            <FileButton button="btn variant-filled-primary btn-lg rounded-[3rem] !text-black w-full font-medium" class="max-w-36 w-full" name="avatar" accept="image/*" on:change={onChangeHandler}>
                                { avatarFile ? 'Re-upload' : 'Upload' }
                            </FileButton>
                            <button class="btn variant-filled-secondary btn-lg rounded-[3rem] !text-black max-w-36 w-full font-medium" disabled={avatarFile === null} onclick={() => changeStep(step() + 1)}>
                                Next
                            </button>
                        </div>
                    </div>
                    {#if avatar}
                        <div transition:fade={{duration: 100}}>
                            <div class="absolute top-0 left-0 h-full w-full bg-black/60"></div>
                            <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center max-w-xs sm:max-w-sm w-full p-4 rounded-3xl bg-surface-500">
                                <div class="relative size-72 rounded-xl overflow-hidden">
                                    <Cropper
                                        image={avatar}
                                        crop={{x: 0, y: 0}}
                                        zoom={1}
                                        aspect={1}
                                        on:cropcomplete={saveCrop}
                                    />
                                </div>
                                <div class="flex justify-center items-center mt-4 w-full gap-8">
                                    <button class="btn variant-outline-primary font-medium !text-black w-20" onclick={() => avatar = null}>
                                        Cancel
                                    </button>
                                    <button class="btn variant-filled-primary font-medium !text-black w-20" onclick={async () => {
                                        if (!avatar || !pixelCrop) return;
                                        croppedAvatar = await getCroppedImg(avatar, pixelCrop);
                                        avatar = null;
                                    }}>
                                        Crop
                                    </button>
                                </div>
                            </div>
                        </div>
                    {/if}
                </div>
            </div>
        {:else if step() === 2}
            <div class="absolute top-0 left-0 h-full w-full p-8" transition:fade>
                <div class="w-full">
                    <h1 class="text-primary-900 text-2xl font-bold text-left">Step 2:</h1>
                </div>
            </div>
        {:else if step() === 3}
            <div class="absolute top-0 left-0 h-full w-full p-8" transition:fade>
                <div class="w-full">
                    <h1 class="text-primary-900 text-2xl font-bold text-left">Step 2:</h1>
                </div>
            </div>
        {/if}
    </div>
</div>