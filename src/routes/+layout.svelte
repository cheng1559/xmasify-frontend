<script lang="ts">
	import '../app.postcss';
    import '../app.css';
    import '@fontsource/poppins/100.css';  // Extra Light weight
    import '@fontsource/poppins/300.css';  // Light weight
    import '@fontsource/poppins/400.css';  // Regular weight
    import '@fontsource/poppins/500.css';  // Medium weight
    import '@fontsource/poppins/600.css';  // Semi-Bold weight
    import '@fontsource/poppins/700.css';  // Bold weight
    import '@fontsource/poppins/800.css';  // Extra-Bold weight
    import '@fontsource/poppins/900.css';  // Black weight
    import { initializeStores, Toast } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';

    storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

    initializeStores();
</script>

<div class="w-full bg-primary-100 transition-all h-full flex justify-center items-center sm:p-4 overflow-hidden">
    <div class="w-full max-w-screen-sm h-full bg-primary-500 shadow-xl overflow-hidden sm:border-4 sm:rounded-[2rem] sm:border-white">
        <Toast position="t" />
        <slot />
    </div>
</div>