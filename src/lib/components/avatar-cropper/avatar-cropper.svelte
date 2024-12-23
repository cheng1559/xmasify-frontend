<script lang="ts">
    import Cropper from 'svelte-easy-crop';
    import type {CropArea} from "svelte-easy-crop/dist/types";
    import { getCroppedImg } from "$lib/components/avatar-cropper/canvasUtils";
    import { fade } from "svelte/transition";

    let croppedAvatar: Blob | null = $state(null);
    let pixelCrop: CropArea | null = $state(null);

    function saveCrop(crop: CustomEvent<{
        percent: CropArea;
        pixels: CropArea;
    }>): void {
        pixelCrop = crop.detail.pixels;
    }

    let { avatar, crop }: { 
        avatar: string | null, 
        crop: (croppedAvatar: Blob | null) => void
    } = $props();
</script>


{#if avatar}
    <div transition:fade={{duration: 100}}>
        <div class="absolute top-0 left-0 h-full w-full bg-black/60"></div>
        <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center max-w-xs sm:max-w-sm w-full p-4 rounded-3xl bg-surface-500">
            <div class="relative size-72 rounded-xl overflow-hidden border">
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
                    crop(croppedAvatar);
                }}>
                    Crop
                </button>
            </div>
        </div>
    </div>
{/if}