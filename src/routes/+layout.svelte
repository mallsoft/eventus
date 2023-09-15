<script>
	import { invalidate } from '$app/navigation';
	import Header from '$lib/Header.svelte';
	import { onMount } from 'svelte';
	import '@fontsource-variable/readex-pro';
	import '../app.css';

	export let data;

	$: ({ supabase, session } = data);

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => subscription.unsubscribe();
	});
</script>

<Header {data} />

<main>
	<slot />
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: 1rem;
	}
</style>
