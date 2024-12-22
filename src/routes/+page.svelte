<script lang="ts">
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import { ArrowRight } from 'lucide-svelte';
</script>


<div class="w-full bg-primary-100 transition-all h-full flex justify-center items-center md:p-4">
	<div class="w-full max-w-screen-sm flex flex-col items-center h-full bg-surface-500 shadow-xl overflow-hidden md:border-4 md:rounded-[2rem] md:border-white">
		<div class="flex items-center justify-center flex-1 flex-col">
			<img src="/images/christmas-tree.png" class="w-4/5" alt="" />
			<div class="flex flex-col gap-2 justify-center items-center mt-8 mb-16">
				<h1 class="h1 select-none bg-gradient-to-br from-primary-500 to-cyan-600 font-semibold bg-clip-text text-transparent box-decoration-clone">
					Be a Secret Santa
				</h1>
				<h1 class="h1 select-none bg-gradient-to-br from-primary-500 to-cyan-600 font-semibold bg-clip-text text-transparent box-decoration-clone">
					of your beloved
				</h1>
			</div>
		</div>
		<div class="bg-primary-500 w-full flex justify-center relative h-16">
			<div class="absolute left-1/2 -translate-y-1/2 -translate-x-1/2 size-[6.5rem] bg-primary-500 rounded-full" style="clip-path: path('M 0 0 Q 50% -30 100% 0 L 100% 100% L 0 100% Z')"></div>

<!--			<svg width="300" height="150" xmlns="http://www.w3.org/2000/svg" class="absolute bottom-10 text-primary-500">-->
<!--				&lt;!&ndash; Sigmoid-like curve &ndash;&gt;-->
<!--				<path d="M 10 140 C 80 10, 220 10, 290 140" stroke="currentColor" fill="currentColor" stroke-width="2" />-->
<!--			</svg>-->
			<svg width="300" height="150" class="bottom-10 absolute left-1/2 -translate-x-1/2 " xmlns="http://www.w3.org/2000/svg">
				<path
					d="M 0 50
					   C 50 10, 150 10, 200 50
					   C 150 90, 50 90, 0 50"
					fill="none"
					stroke="blue"
					stroke-width="2" />
			</svg>
			<button class="btn btn-icon variant-filled rounded-full size-16 absolute left-1/2 -translate-y-1/2 -translate-x-1/2">
				<ArrowRight stroke-width={5} class="size-8" />
			</button>
		</div>
	</div>
</div>
