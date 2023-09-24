<script>
	import { invalidate } from '$app/navigation';
	import Nav from '$lib/Nav.svelte';
	import { onMount } from 'svelte';
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

<Nav {data} />

<main class="container">
	<slot />
</main>

<style>
	main {
		box-sizing: border-box;

		display: flex;
		flex-direction: column;
		padding: 1rem;
		max-width: var(---colwidth);
		width: 100%;

		margin-top: 4rem;
		margin-bottom: 8rem;
	}

	main > :global(h1) {
		font-size: 5rem;

		padding-bottom: 1rem;
		margin-bottom: 4rem;
	}

	@media (width < 610px) {
		main > :global(h1) {
			font-size: 3rem;
		}
	}
</style>
