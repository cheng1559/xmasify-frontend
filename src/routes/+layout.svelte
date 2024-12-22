<script lang="ts">
	import '../app.postcss';
    import '../app.css';
    import '@fontsource/poppins/100.css';  // Extra Light weight
    import '@fontsource/poppins/300.css';  // Light weight
    import '@fontsource/poppins/400.css';  // Regular weight
    import '@fontsource/poppins/500.css';  // Medium weight
    import '@fontsource/poppins/600.css';  // Semi-Bold weight
    import '@fontsource/poppins/700.css';  // Bold weight


    // Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
</script>

<slot />
