<script lang="ts">
    import { fade } from 'svelte/transition';
    import { MusicPlayer } from '$lib/components/music-player';
    import { getToastStore } from '@skeletonlabs/skeleton';
    import { FileButton } from '@skeletonlabs/skeleton';
    import { onMount } from 'svelte';
    import { AvatarCropper } from "$lib/components/avatar-cropper";
    import { AvatarPainter } from "$lib/components/avatar-painter";
    import autoAnimate from "@formkit/auto-animate"
    import { ArrowRight } from "lucide-svelte";
    import { xmasify } from "$lib/api/xmasify-api";

    const toastStore = getToastStore();

    let step = $state(1);

    function changeStep(newStep: number) {
        step = newStep;
    }

    function checkFileIsValid(file: File): boolean {
        const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml', 'image/bmp', 'image/tiff'];
        return validTypes.includes(file.type);
    }

    let avatar: string | null = $state(null);
    let avatarFile: Blob | null = $state(null);
    let croppedAvatar: Blob | null = $state(null);
    let mask: Blob | null = $state(null);
    let xmasifiedAvatar: Blob | null = $state(null);
    let avatarPainter: ReturnType<typeof AvatarPainter> | null = $state(null);

    function onChangeHandler(e: Event): void {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (file && checkFileIsValid(file)) {
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

    onMount(() => {
        changeStep(1);
    });

    async function handleUpload() {
        if (!avatarPainter) return;
        mask = await avatarPainter.getMask();
        if (!croppedAvatar || !mask) return;
        const prompt = 'This is a huge red santa hat!';
        xmasifiedAvatar = await xmasify(croppedAvatar, mask, prompt);
    }

</script>

<div class="h-full w-full flex items-center justify-center relative flex-col bg-primary-500 p-4 gap-3">
    <MusicPlayer />
    <div class="flex-1 w-full bg-surface-500 rounded-3xl shadow-lg relative overflow-hidden" transition:fade>
        {#if step === 1}
            <div class="absolute top-0 left-0 h-full w-full p-8 flex flex-col items-center justify-center" transition:fade>
                <div class="flex-1 w-full flex items-center justify-center relative ">
                    {#if !croppedAvatar}
                        <div class="rounded-full absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white size-64 sm:size-80 opacity-70"></div>
                        <img src="/images/santa-claus.png" class="w-4/5 max-w-xs relative select-none" alt="" />
                    {:else}
                        <img src={URL.createObjectURL(croppedAvatar)} class="w-4/5 max-w-xs relative rounded-3xl shadow select-none" alt="" />
                    {/if}
                </div>
                <div class="w-full mt-6">
                    {#if !croppedAvatar}
                        <h1 class="text-primary-900 text-4xl font-bold text-left select-none">
                            Upload your avatar!
                        </h1>
                        <div class="mt-4 text-surface-900 select-none">
                            Easy to use, just upload your avatar and we will do the rest!
                        </div>
                    {:else}
                        <h1 class="text-primary-900 text-4xl font-bold text-left select-none">
                            Perfect! Let's continue.
                        </h1>
                    {/if}
                    <div class="flex justify-center mt-12 px-3 gap-6" use:autoAnimate>
                        <FileButton button="btn variant-filled-primary btn-lg rounded-[3rem] !text-black w-full font-medium" class="max-w-36 w-full" name="avatar" accept="image/*" on:change={onChangeHandler}>
                            { croppedAvatar ? 'Re-upload' : 'Upload' }
                        </FileButton>
                        {#if croppedAvatar}
                            <button class="btn variant-filled-secondary btn-icon-lg !text-black font-medium p-0" disabled={avatarFile === null} onclick={() => changeStep(step + 1)}>
<!--                                Next-->
                                <ArrowRight class="size-6" />
                            </button>
                        {/if}
                    </div>
                </div>
                <AvatarCropper {avatar} crop={(croppedAvatar_) => {
                    croppedAvatar = croppedAvatar_;
                    avatar = null;
                }} />
            </div>
        {:else if step === 2}
            <div class="absolute top-0 left-0 h-full w-full p-8 flex flex-col items-center justify-center" transition:fade>
                <AvatarPainter bind:this={avatarPainter} avatar={croppedAvatar} />
                {#if xmasifiedAvatar}
                    <img class="size-32" src={URL.createObjectURL(xmasifiedAvatar)} alt="" />
                {/if}
                <div class="w-full mt-6">
<!--                    <h1 class="text-primary-900 h1 font-bold text-left select-none">-->
<!--                        Draw the area you want to wear santa hat!-->
<!--                    </h1>-->
                    <div class="grid mt-12 px-3 grid-cols-2 gap-6 place-items-center">
                        <button class="btn variant-filled-secondary btn-lg rounded-[3rem] !text-black max-w-36 w-full font-medium" onclick={handleUpload}>
                            Start
                        </button>
                        <button class="btn variant-filled-secondary btn-lg rounded-[3rem] !text-black max-w-36 w-full font-medium" onclick={() => step = 1}>
                            Back
                        </button>
                    </div>
                </div>
            </div>
        {:else if step === 3}
            <div class="absolute top-0 left-0 h-full w-full p-8" transition:fade>
                <div class="w-full">
                    <h1 class="text-primary-900 text-2xl font-bold text-left">Step 2:</h1>
                </div>
            </div>
        {/if}
    </div>
</div>