<script lang="ts">
    import { fade } from 'svelte/transition';
    import { MusicPlayer } from '$lib/components/music-player';
    import {getToastStore, ListBox, ListBoxItem, popup, type PopupSettings} from '@skeletonlabs/skeleton';
    import { FileButton } from '@skeletonlabs/skeleton';
    import { onMount } from 'svelte';
    import { AvatarCropper } from "$lib/components/avatar-cropper";
    import { AvatarPainter } from "$lib/components/avatar-painter";
    import autoAnimate from "@formkit/auto-animate"
    import {ArrowLeft, ArrowRight, Check} from "lucide-svelte";
    import { xmasify } from "$lib/api/xmasify-api";

    const toastStore = getToastStore();

    let step = $state(1);
    let showDemo = $state(true);

    function changeStep(newStep: number) {
        if (newStep === 1) {
            avatar = null;
            avatarFile = null;
            croppedAvatar = null;
            mask = null;
            hasMask = false;
            avatarPainter = null;
            xmasifiedAvatarList.splice(0);
        }
        if (!showDemo && (newStep === 2 || newStep === 3)) {
            step = 4;
        } else {
            if (newStep === 4) {
                showDemo = false;
            }
            step = newStep;
        }
    }

    function checkFileIsValid(file: File): boolean {
        const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml', 'image/bmp', 'image/tiff'];
        return validTypes.includes(file.type);
    }

    let avatar: string | null = $state(null);
    let avatarFile: Blob | null = $state(null);
    let croppedAvatar: Blob | null = $state(null);
    let mask: Blob | null = $state(null);
    let hasMask: boolean = $state(false);
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

    let isLoading = $state(false);
    const xmasifiedAvatarList: Blob[] = [];

    async function handleUpload() {
        if (!avatarPainter) return;
        mask = await avatarPainter.getMask();
        if (!croppedAvatar || !mask) return;
        const prompt = chosenStyle.prompt;
        const negativePrompt = chosenStyle.negativePrompt;
        try {
            isLoading = true;
            const promises = Array.from({ length: 4 }, () =>
                croppedAvatar && mask && xmasify(croppedAvatar, mask, prompt, negativePrompt)
            );
            const results = await Promise.all(promises);
            results.forEach((blob) => blob && xmasifiedAvatarList.push(blob));
            toastStore.trigger({
                message: 'Finished!',
                background: 'variant-filled-success',
            });
            changeStep(5);
        } catch (error) {
            console.error(error);
            toastStore.trigger({
                message: 'Something went wrong, please try again!',
                background: 'variant-filled-error',
            });
        } finally {
            isLoading = false;
        }
    }

    interface XmasifyStyle {
        value: 'santa-hat' | 'christmas-tree' | 'santa-beard';
        label: string;
        prompt: string;
        negativePrompt?: string;
    }

    const styles: XmasifyStyle[] = [
        {
            value: 'santa-hat',
            label: 'Santa Hat',
            prompt: 'Add a red Santa hat with white trim, festive and natural, fitting the head well.',
            negativePrompt: 'No unrealistic shapes or colors; avoid oversized or misplaced hats.'
        },
        {
            value: 'christmas-tree',
            label: 'Christmas Tree',
            prompt: 'Add a decorated Christmas tree, festive and vibrant, with ornaments and lights.',
            negativePrompt: 'No unnatural shapes or dull colors; avoid sparse or poorly decorated trees.'
        },
        {
            value: 'santa-beard',
            label: 'Santa Beard',
            prompt: 'Add a fluffy white Santa beard, natural and festive, blending with the face.',
            negativePrompt: 'No colors but white for the beard; avoid unrealistic shapes or textures.'
        }
    ]

    let chosenStyle: XmasifyStyle = $state(styles[0]);

    const popupCombobox: PopupSettings = {
        event: 'click',
        target: 'popupCombobox',
        placement: 'bottom',
        closeQuery: '.listbox-item'
    };

    async function copyAvatarToClipboard(avatar: Blob) {
        try {
            const clipboardItem = new ClipboardItem({ 'image/png': avatar });
            await navigator.clipboard.write([clipboardItem]); // 写入剪切板
            toastStore.trigger({
                message: 'Avatar copied to clipboard!',
                background: 'variant-filled-success',
            });
        } catch (error) {
            console.error(error);
            toastStore.trigger({
                message: 'Failed to copy avatar to clipboard!',
                background: 'variant-filled-error',
            });
        }
    }


</script>

<div class="h-full w-full flex items-center justify-center relative flex-col p-4 gap-3" transition:fade>
    <MusicPlayer />
    <div class="flex-1 w-full bg-surface-500 rounded-3xl shadow-lg relative overflow-hidden">
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
                        <FileButton button="btn variant-filled-primary btn-lg rounded-[3rem] w-full font-medium" class="max-w-36 w-full" name="avatar" accept="image/*" on:change={onChangeHandler}>
                            { croppedAvatar ? 'Re-upload' : 'Upload' }
                        </FileButton>
                        {#if croppedAvatar}
                            <button class="btn variant-filled-secondary btn-icon-lg rounded-full font-medium p-0" disabled={avatarFile === null} onclick={() => changeStep(step + 1)}>
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
                <div class="flex-1 w-full flex items-center justify-center relative overflow-hidden">
                    <video
                        class="w-full h-full"
                        autoplay
                        loop
                        muted
                        playsinline
                    >
                        <source src="/demo/step1.mp4" type="video/mp4">
                    </video>

                </div>
                <div class="w-full mt-6">
                    <h1 class="text-primary-900 h1 font-bold text-left select-none">
                        Paint the area you want to xmasify!
                    </h1>
                    <div class="mt-4 text-surface-900 select-none">
                        The area you paint will be xmasified with the style you choose.
                    </div>
                    <div class="flex mt-6 items-center justify-center">
                        <button class="btn variant-filled-secondary btn-icon-lg rounded-full p-0 font-medium" onclick={() => changeStep(step + 1)}>
                            <Check class="size-6" />
                        </button>
                    </div>
                </div>
            </div>
        {:else if step === 3}
            <div class="absolute top-0 left-0 h-full w-full p-8 flex flex-col items-center justify-center" transition:fade>
                <div class="flex-1 w-full flex items-center justify-center relative overflow-hidden">
                    <video
                        class="w-full h-full"
                        autoplay
                        loop
                        muted
                        playsinline
                    >
                        <source src="/demo/step2.mp4" type="video/mp4">
                    </video>

                </div>
                <div class="w-full mt-6">
                    <h1 class="text-primary-900 h1 font-bold text-left select-none">
                        Choose the Xmasify style!
                    </h1>
                    <div class="mt-4 text-surface-900 select-none">
                        We provide three presets: Santa Hat, Christmas Tree, and Santa Beard.
                    </div>
                    <div class="flex mt-6 items-center justify-center">
                        <button class="btn variant-filled-secondary btn-icon-lg rounded-full p-0 font-medium" onclick={() => changeStep(step + 1)}>
                            <Check class="size-6" />
                        </button>
                    </div>
                </div>
            </div>
        {:else if step === 4}
            <div class="absolute top-0 left-0 h-full w-full p-8 flex flex-col items-center justify-center" transition:fade>
                <AvatarPainter bind:this={avatarPainter} avatar={croppedAvatar} bind:hasMask={hasMask} />
                <div class="w-full mt-6">
                    <div class="flex gap-4 justify-center">
                        <button class="btn variant-filled-secondary btn-icon-lg p-0 rounded-full font-medium flex-shrink-0" disabled={isLoading} onclick={() => changeStep(1)}>
                            <ArrowLeft class="size-6" />
                        </button>
                        <button class="btn variant-filled-primary btn-lg rounded-[3rem] max-w-36 w-full font-medium" disabled={!hasMask || isLoading} onclick={handleUpload}>
                            Xmasify!
                        </button>

                        <button class="btn variant-soft-primary btn-icon-lg p-0 rounded-full  font-medium flex-shrink-0" use:popup={popupCombobox} use:autoAnimate>
                            {#if chosenStyle.value === 'santa-hat'}
                                <img src="/icons/santa-hat.png" alt="" class="size-8" >
                            {:else if chosenStyle.value === 'christmas-tree'}
                                <img src="/icons/christmas-tree.png" alt="" class="size-8" >
                            {:else if chosenStyle.value === 'santa-beard'}
                                <img src="/icons/santa-beard.png" alt="" class="size-8" >
                            {/if}
                        </button>

                        <div class="card shadow-xl overflow-hidden rounded-lg !bg-primary-500" data-popup="popupCombobox">
                            <ListBox rounded="rounded-none" spacing="space-y-0">
                                {#each styles as style}
                                    <ListBoxItem bind:group={chosenStyle} name="medium" value={style} class="transition-all">
                                        <div class="flex items-center gap-2">
                                            <img src={`/icons/${style.value}.png`} alt="" class="size-8" >
                                            <div> { style.label } </div>
                                        </div>
                                    </ListBoxItem>
                                {/each}
                            </ListBox>
                            <div class="arrow bg-surface-100-800-token"> </div>
                        </div>
                    </div>
                </div>
            </div>
        {:else if step === 5}
            <div class="absolute top-0 left-0 h-full w-full p-8 flex flex-col items-center justify-center" transition:fade>
                <h1 class="text-primary-900 h1 font-bold text-left select-none">
                    Select your favorite one!
                </h1>
                <div class="mt-2 text-surface-900 select-none text-left w-full">
                    Click on the avatar to copy it to the clipboard.
                </div>
                <div class="flex items-center justify-center flex-1 max-w-md w-full">
                    <div class="grid grid-cols-2 gap-3 w-full">
                        {#each xmasifiedAvatarList as xmasifiedAvatar}
                            <button class="btn p-0" onclick={() => copyAvatarToClipboard(xmasifiedAvatar)}>
                                <img class="rounded-3xl shadow" src={URL.createObjectURL(xmasifiedAvatar)} alt="" />
                            </button>
                        {/each}
                    </div>
                </div>
                <button class="btn variant-filled-primary btn-lg rounded-[3rem] max-w-36 w-full font-medium mt-2" onclick={() => changeStep(1)}>
                    Try again!
                </button>

                <div class="absolute bottom-1 w-full items-center justify-center text-surface-900 text-center text-xs"> By Cheng🍊 2024/12/24 </div>
            </div>
        {/if}
    </div>
</div>