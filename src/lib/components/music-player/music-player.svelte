<script lang="ts">
    import { onMount } from 'svelte';
    import { songs } from './music-list';
    import { ProgressBar } from '@skeletonlabs/skeleton';
    import { Pause, Play, SkipForward } from "lucide-svelte";
    import { fade } from 'svelte/transition';

    let currentSongIndex: number = 0; // 当前歌曲索引
    let isPlaying: boolean = false; // 播放状态
    let audio: HTMLAudioElement | null = null; // 音频引用
    let rotation = 0; // 记录当前旋转的角度
    let animationFrame: number | null = null; // 用于控制动画帧
    let lastTimestamp = 0;

    let divElement: HTMLDivElement | null = null; // 引用 DOM 元素
    let divWidth: number = 0; // 存储 div 的宽度

    let currentTime = 0; // 当前播放时间（秒）
    let duration = 0; // 音频总时长（秒）

    const updateWidth = () => {
        if (divElement) {
            divWidth = divElement.offsetWidth;
            document.documentElement.style.setProperty('--div-width', `${divWidth}px`);
        }
    };

    function startRotation() {
        if (animationFrame !== null) return; // 防止重复启动

        function rotate(timestamp: number) {
            if (!lastTimestamp) {
                lastTimestamp = timestamp; // 初始化上一次时间戳
            }
            const delta = timestamp - lastTimestamp; // 当前帧与上一帧的时间差
            rotation = (rotation + (delta / 1000) * 36) % 360; // 计算旋转角度
            lastTimestamp = timestamp;
            animationFrame = requestAnimationFrame(rotate); // 请求下一帧
        }

        animationFrame = requestAnimationFrame(rotate);
    }

    function updateTime() {
        if (audio) {
            currentTime = audio.currentTime;
        }
    }

    function setDuration() {
        if (audio) {
            duration = audio.duration;
        }
    }

    function stopRotation() {
        if (animationFrame !== null) {
            cancelAnimationFrame(animationFrame);
            animationFrame = null;
        }
    }

    function playSong() {
        if (audio) {
            audio.play().then(() => {
                stopRotation();
                startRotation();
                isPlaying = true;
            });
        }
    }

    function pauseSong() {
        if (audio) {
            audio.pause();
            stopRotation();
            isPlaying = false;
        }
    }

    function switchSong(index: number) {
        if (index < 0 || index >= songs.length) return;
        currentSongIndex = index;
        if (audio) {
            audio.src = songs[currentSongIndex].src;
            if (isPlaying) playSong(); // 如果正在播放，则继续播放
        }
    }

    onMount(() => {
        if (audio) {
            audio.src = songs[currentSongIndex].src;
            audio.volume = 0.5;
            // playSong();
        }
        updateWidth();
        window.addEventListener('resize', updateWidth);
        return () => {
            window.removeEventListener('resize', updateWidth);
        };
    });
</script>

<div class="bg-surface-500 rounded-3xl h-16 transition-all shadow-lg p-3 relative overflow-hidden w-full" transition:fade>
    <div class="flex gap-2">
        <div class="size-10 relative" style="transform: rotate({rotation}deg);">
            <img src="/images/cd.png" alt="" class="absolute top-0 left-0 z-0" />
            <img src="/images/santa-hat.png" alt="" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6"/>
        </div>
        <div class="flex items-center overflow-hidden flex-1 relative" bind:this={divElement} >
            {#if songs.length > 0}
                <p class="font-bold text-primary-900 text-nowrap"
                   class:animate-scroll={isPlaying}
                >
                    {songs[currentSongIndex]?.title} - {songs[currentSongIndex].artist}
                </p>
            {/if}
        </div>
        <div class="flex items-center space-x-2">
            <button
                class="btn btn-icon variant-filled-secondary rounded-full size-9"
                onclick={isPlaying ? pauseSong : playSong}
                disabled={songs.length === 0}
            >
                {#if isPlaying}
                    <Pause strokeWidth={2.5} class="size-5" />
                {:else}
                    <Play strokeWidth={2.5} class="size-5" />
                {/if}
            </button>
            <button
                class="btn btn-icon variant-filled-secondary rounded-full size-9"
                onclick={() => switchSong((currentSongIndex + 1) % songs.length)}
            >
                <SkipForward strokeWidth={2.5} class="size-5" />
            </button>
        </div>
    </div>
    <div class="absolute w-full -bottom-0 left-0">
        <ProgressBar class="h-[0.2rem] bg-secondary-500-token" meter="bg-secondary-500" value={currentTime} max={duration} />
    </div>
    <audio
            bind:this={audio}
            ontimeupdate={updateTime}
            onloadedmetadata={setDuration}
            class="hidden"
            onended={() => switchSong((currentSongIndex + 1) % songs.length)}
    ></audio>
</div>

<style>
    @keyframes scroll {
        0% {
            transform: translateX(var(--div-width));
        }
        100% {
            transform: translateX(-100%);
        }
    }

    .animate-scroll {
        animation: scroll 10s linear infinite;
    }
</style>