<script lang="ts">
    import { fade } from 'svelte/transition';
    import { MusicPlayer } from '$lib/components/music-player';
</script>

<div class="h-full w-full flex items-center justify-center relative flex-col bg-primary-500">
    <MusicPlayer />
    <div class="flex-1 flex flex-col items-center justify-center p-12" transition:fade>
        <div class="rounded-2xl border-4 border-white bg-surface-500 p-3">
            <img src="/images/santa-claus.png" alt="" />
        </div>
<!--        <h1 class="h1"> hello! </h1>-->
    </div>
</div>