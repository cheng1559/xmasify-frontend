<script lang="ts">
    import { onDestroy, onMount } from "svelte";
    import { RangeSlider } from '@skeletonlabs/skeleton';
    import {Circle, Eraser} from "lucide-svelte";

    let { avatar }: {
        avatar: Blob | null
    } = $props();
    let brushSize: number = $state(50);
    let isDrawing: boolean = $state(false);

    let brush: HTMLDivElement | null = $state(null);
    let canvas: HTMLCanvasElement | null = $state(null);
    let ctx: CanvasRenderingContext2D | null;


    const updateCanvasSize = () => {
        if (!canvas) return;
        const size  = Math.min(canvas.offsetWidth, canvas.offsetHeight);
        canvas.width = size;
        canvas.height = size;
    };

    onMount(() => {
        if (!canvas) return;
        ctx = canvas.getContext("2d");
        handleBrushSizeChange();
        if (ctx) {
            ctx.lineJoin = "round";
            ctx.lineCap = "round";
            ctx.strokeStyle = "rgba(0, 0, 0)";
        }

        const resizeObserver = new ResizeObserver(() => {
            updateCanvasSize();
        });
        resizeObserver.observe(canvas);
        onDestroy(() => {
            resizeObserver.disconnect();
        });
        updateCanvasSize();
    });

    function hideBrush() {
        if (brush) {
            brush.style.display = "none";
        }
    }

    function moveBrush(event: MouseEvent | TouchEvent) {
        if (!brush || !canvas) return;
        let clientX: number;
        let clientY: number;
        if (event instanceof TouchEvent) {
            clientX = event.touches[0].clientX;
            clientY = event.touches[0].clientY;
        } else {
            clientX = event.clientX;
            clientY = event.clientY;
        }
        const canvasRect = canvas.getBoundingClientRect();
        const offsetX = clientX - canvasRect.left;
        const offsetY = clientY - canvasRect.top;
        brush.style.left = `${offsetX - brush.offsetWidth / 2}px`;
        brush.style.top = `${offsetY - brush.offsetHeight / 2}px`;
        brush.style.display = "block";
    }

    function draw(event: MouseEvent | TouchEvent) {
        if (!ctx || !canvas) return;
        let x: number, y: number;
        if (event instanceof TouchEvent) {
            const touch = event.touches[0];
            const rect = canvas.getBoundingClientRect();
            x = touch.clientX - rect.left;
            y = touch.clientY - rect.top;
        } else {
            x = event.offsetX;
            y = event.offsetY;
        }

        ctx.save();
        ctx.lineJoin = "round";
        ctx.lineCap = "round";
        ctx.lineWidth = brushSize;
        ctx.globalCompositeOperation = 'source-over';
        ctx.fillStyle = "rgba(0, 0, 0)";
        ctx.lineTo(x, y)
        ctx.stroke();
        ctx.restore();
    }

    function startDrawing(event: MouseEvent | TouchEvent) {
        if (!ctx || !canvas) return;
        isDrawing = true;
        let x: number, y: number;
        if (event instanceof TouchEvent) {
            const touch = event.touches[0];
            const rect = canvas.getBoundingClientRect();
            x = touch.clientX - rect.left;
            y = touch.clientY - rect.top;
        } else {
            x = event.offsetX;
            y = event.offsetY;
        }
        ctx.moveTo(x, y);
    }

    function stopDrawing() {
        isDrawing = false;
    }

    function leaveDrawing() {
        stopDrawing();
        hideBrush();
    }

    function handleMouseMove(event: MouseEvent) {
        moveBrush(event);
        if (isDrawing) {
            draw(event);
        }
    }

    function handleTouchMove(event: TouchEvent) {
        moveBrush(event);
        if (isDrawing) {
            draw(event);
        }
    }

    function handleMouseUp() {
        stopDrawing();
    }

    function handleTouchEnd() {
        stopDrawing();
        hideBrush();
    }

    function clearMask() {
        if (!ctx || !canvas) return;
        ctx.beginPath();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.closePath();
        // ctx.restore();
    }

    function handleBrushSizeChange() {
        if (brush) {
            brush.style.width = `${Math.max(brushSize, 10)}px`;
            brush.style.height = `${Math.max(brushSize, 10)}px`;
            brush.style.borderWidth = `${Math.max(brushSize / 10, 1)}px`;
        }
    }
</script>


<div class="flex space-x-2 p-3 bg-primary-500 rounded-2xl shadow-md w-full mb-4">
    <div class="flex items-center space-x-2 flex-1 px-2">
        <Circle class="size-4" />
        <RangeSlider
            name="brush-size"
            min={20}
            max={80}
            bind:value={brushSize}
            on:change={handleBrushSizeChange}
            class="flex-1"
        />
        <Circle class="size-8" />
    </div>

    <button
        onclick={clearMask}
        class="btn size-10 p-0 bg-red-500 rounded-2xl"
    >
        <Eraser class="size-6" />
    </button>
</div>

{#if avatar}
    <div class="relative justify-center rounded-2xl overflow-hidden w-full flex-shrink-0">
        <img draggable="false" src={URL.createObjectURL(avatar)} alt="" class="w-full select-none h-full absolute top-0 left-0 pointer-events-none" />
        <canvas
            bind:this={canvas}
            class="cursor-none w-full relative opacity-50"
            onmousedown={startDrawing}
            onmousemove={handleMouseMove}
            onmouseup={handleMouseUp}
            onmouseleave={leaveDrawing}
            ontouchstart={startDrawing}
            ontouchmove={handleTouchMove}
            ontouchend={handleTouchEnd}
        ></canvas>
        <div bind:this={brush} class="rounded-full bg-black/40 absolute pointer-events-none"></div>
    </div>
{/if}