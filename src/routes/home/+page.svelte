<script lang="ts">
    import { fade } from 'svelte/transition';
    import { MusicPlayer } from '$lib/components/music-player';
    // import { getToastStore } from '@skeletonlabs/skeleton';
    import { FileButton } from '@skeletonlabs/skeleton';
    // const toastStore = getToastStore();

    let step = 1;
</script>

<div class="h-full w-full flex items-center justify-center relative flex-col bg-primary-500 p-4 gap-3">
    <MusicPlayer />
    <div class="flex-1 flex flex-col items-center justify-center w-full bg-surface-500 rounded-3xl shadow-lg p-8" transition:fade>
        {#if step === 1}

            <div class="flex-1 w-full flex items-center justify-center relative">
                <div class="rounded-full absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white size-72 opacity-70"></div>
                <img src="/images/santa-claus.png" class="w-4/5 max-w-xs z-10" alt="" />
            </div>
            <div class="w-full">
                <h1 class="text-primary-900 font-sans text-4xl font-bold text-left">
                    Upload your avatar!
                </h1>
                <div class="mt-4 text-surface-900 font-sans">
                    Easy to use, just upload your avatar and we will do the rest!
                </div>
                <div class="grid mt-12 px-3 grid-cols-2 gap-6 place-items-center">
                    <FileButton button="btn variant-filled-primary btn-lg rounded-[3rem] font-sans !text-black w-full" class="max-w-36 w-full" name="avatar"> Upload </FileButton>
                    <button class="btn variant-filled-secondary btn-lg rounded-[3rem] font-sans !text-black max-w-36 w-full" disabled> Next </button>
                </div>
            </div>
        {:else if step === 2}
            <div class="w-full">
                <h1 class="text-primary-900 font-sans text-2xl font-bold text-left">Step 2:</h1>
            </div>
        {:else if step === 3}
            <div class="w-full">
                <h1 class="text-primary-900 font-sans text-2xl font-bold text-left">Step 3:</h1>
            </div>
        {/if}
    </div>
</div>