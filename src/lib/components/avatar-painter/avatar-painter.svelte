<script lang="ts">
    import { onDestroy, onMount } from "svelte";
    import { RangeSlider } from '@skeletonlabs/skeleton';
    import { Circle, Eraser } from "lucide-svelte";

    let { avatar, hasMask = $bindable() }: {
        avatar: Blob | null,
        hasMask: boolean
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
        brush.style.display = "block";
        brush.style.left = `${offsetX - brush.offsetWidth / 2}px`;
        brush.style.top = `${offsetY - brush.offsetHeight / 2}px`;
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
        hasMask = true;
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

    function handleMouseDown(event: MouseEvent) {
        startDrawing(event);
        // console.log('mouse down');
    }

    function stopDrawing() {
        isDrawing = false;
    }

    function leaveDrawing(event: MouseEvent) {
        event.preventDefault();
        stopDrawing();
        hideBrush();
        // console.log('leave drawing');
    }

    function handleMouseMove(event: MouseEvent) {
        moveBrush(event);
        if (isDrawing) {
            draw(event);
        }
        // console.log('mouse moving');
    }

    function handleMouseUp() {
        stopDrawing();
        // console.log('mouse up');
    }

    // function handleTouchStart(event: TouchEvent) {
    //     startDrawing(event);
    //     console.log('touch start');
    // }

    // function handleTouchMove(event: TouchEvent) {
    //     moveBrush(event);
    //     if (isDrawing) {
    //         draw(event);
    //     }
    //     console.log('touch moving');
    // }

    // function handleTouchEnd() {
    //     stopDrawing();
    //     hideBrush();
    //     console.log('touch end');
    // }

    function clearMask() {
        if (!ctx || !canvas) return;
        ctx.beginPath();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.closePath();
        hasMask = false;
        // ctx.restore();
    }

    function handleBrushSizeChange() {
        if (brush) {
            brush.style.width = `${Math.max(brushSize, 10)}px`;
            brush.style.height = `${Math.max(brushSize, 10)}px`;
            brush.style.borderWidth = `${Math.max(brushSize / 10, 1)}px`;
        }
    }

    export async function getMask(): Promise<Blob | null> {
        if (!canvas) return null;
        return new Promise<Blob | null>((resolve) => {
            canvas?.toBlob((originalBlob) => {
                if (!originalBlob) {
                    resolve(null);
                    return;
                }

                const img = new Image();
                const url = URL.createObjectURL(originalBlob);

                img.onload = () => {
                    // 创建一个新的 canvas 来处理图像
                    const maskCanvas = document.createElement('canvas');
                    const ctx = maskCanvas.getContext('2d');
                    if (ctx) {
                        maskCanvas.width = img.width;
                        maskCanvas.height = img.height;
                        ctx.drawImage(img, 0, 0);

                        const imageData = ctx.getImageData(0, 0, img.width, img.height);
                        const data = imageData.data;
                        for (let i = 0; i < data.length; i += 4) {
                            const r = data[i];
                            const g = data[i + 1];
                            const b = data[i + 2];
                            if (r === 0 && g === 0 && b === 0 && data[i + 3] !== 0) {
                                data[i] = 255;
                                data[i + 1] = 255;
                                data[i + 2] = 255;
                            } else {
                                data[i] = 0;
                                data[i + 1] = 0;
                                data[i + 2] = 0;
                            }
                            data[i + 3] = 255;
                        }
                        ctx.putImageData(imageData, 0, 0);
                        maskCanvas.toBlob((maskBlob) => {
                            resolve(maskBlob);
                        });
                    } else {
                        resolve(null);
                    }
                };

                img.onerror = () => {
                    resolve(null);
                };

                img.src = url;
            });
        });
    }
</script>

<div class="flex flex-1 items-center justify-center flex-col w-full">
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
                disabled={!hasMask}
                onclick={clearMask}
                class="btn size-10 p-0 bg-red-500 rounded-2xl"
        >
            <Eraser class="size-6" />
        </button>
    </div>
    <div class="flex-1 flex items-center justify-center w-full">
        {#if avatar}
            <div class="relative justify-center rounded-3xl overflow-hidden w-full flex-shrink-0 shadow">
                <img draggable="false" src={URL.createObjectURL(avatar)} alt="" class="w-full select-none h-full absolute top-0 left-0 pointer-events-none" />
                <canvas
                        bind:this={canvas}
                        class="cursor-none w-full relative opacity-50 touch-none"
                        onpointerdown={handleMouseDown}
                        onpointermove={handleMouseMove}
                        onpointerup={handleMouseUp}
                        onpointerleave={leaveDrawing}
                ></canvas>
                <div bind:this={brush} class="rounded-full bg-black/40 absolute pointer-events-none"></div>
            </div>
        {/if}
    </div>
</div>