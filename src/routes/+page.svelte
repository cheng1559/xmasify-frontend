<script lang="ts">
	import { ArrowUp } from 'lucide-svelte';
	import { fade } from 'svelte/transition';
	import { goto } from '$app/navigation';

	let start = false;
	function handleStart() {
		start = true;
		setTimeout(() => {
			goto('/home');
		}, 1500);
	}
</script>


<div class="w-full flex flex-col items-center h-full">
	<div class="flex items-center justify-center flex-1 flex-col min-h-0">
		<img src="/images/christmas-tree.png" class="w-4/5" alt="" />
		<div class="flex flex-col gap-2 justify-center items-center mt-8 mb-16">
			<h1 class="font-sans text-5xl select-none bg-gradient-to-br from-primary-500 to-cyan-600 font-bold bg-clip-text text-transparent box-decoration-clone">
				Xmasify
			</h1>
			<h3 class="select-none text-xl bg-gradient-to-br from-primary-500 to-cyan-600 font-semibold bg-clip-text text-transparent box-decoration-clone">
				Xmasify your Avatar!
			</h3>
		</div>
	</div>
	<div class="bg-primary-500 w-full flex justify-center relative max-h-16 h-full transition-all duration-[1000ms]" class:max-h-full={start}>
		<svg class="-top-0 absolute left-1/2 -translate-x-1/2  -translate-y-1/2 size-44 text-primary-500" width="145" height="79" viewBox="0 0 145 79" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
			<circle cx="72.5" cy="39.5" r="39.5" fill="currentColor"/>
			<path d="M49.5 7.87483C29.5 21.8748 36.6685 38.4224 2 41.3748L44.5 62.8748C44.5 62.8748 69.5 -6.12517 49.5 7.87483Z" fill="currentColor" stroke="currentColor"/>
			<path d="M94.7551 7.87483C114.755 21.8748 107.587 38.4224 142.255 41.3748L99.7551 62.8748C99.7551 62.8748 74.7551 -6.12517 94.7551 7.87483Z" fill="currentColor" stroke="currentColor"/>
		</svg>
		{#if !start}
			<button class="btn btn-icon variant-filled rounded-full size-16 absolute left-1/2 -translate-y-1/2 -translate-x-1/2" on:click={handleStart} transition:fade>
				<ArrowUp stroke-width={5} class="size-8" />
			</button>
		{/if}
	</div>
</div>
