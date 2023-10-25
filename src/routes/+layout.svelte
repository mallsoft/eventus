<script>
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import '../app.css';
	import Header from './_fragments/Header.svelte';

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

<svelte:head>
	<title>DNB Event{data.event_admin ? ' (admin)' : ''}</title>
</svelte:head>

<Header />

<main class="container">
	<slot />
</main>

<footer>
	<a href="/info">Privacy</a>
</footer>

<style>
	main {
		box-sizing: border-box;

		display: flex;
		flex-direction: column;
		padding: 1rem;
		max-width: var(---colwidth);
		width: 100%;

		margin-top: 2rem;
		margin-bottom: 8rem;
	}

	main > :global(h1) {
		background-color: var(--color-b);
		color: var(--color-a);
		font-size: 4.5rem;
		padding: 1rem 2rem;
		margin-bottom: 4rem;
	}

	@media (width < 610px) {
		main > :global(h1) {
			font-size: 2rem;
		}
	}

	footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		padding: 1rem 2rem;
		margin-top: auto;
	}

	footer a {
		color: var(--color-d);
		margin-left: auto;
	}
</style>
