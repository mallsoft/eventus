<script>
	import LogInOut from '$lib/LogInOut.svelte';
	import { page } from '$app/stores';
	import { invalidate } from '$app/navigation';
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

<nav>
	<div>
		{#if data.event_admin && $page.url.pathname !== '/event/create'}
			<a class="buttony" href="/event">Edit</a>
		{/if}

		{#if $page.url.pathname !== '/'}
			<a class="buttony" href="/">Events</a>
		{/if}
	</div>
	<div>
		<LogInOut {data} />
	</div>
</nav>

<main class="container">
	<slot />
</main>

<style>
	nav {
		display: flex;
		justify-content: space-between;

		gap: 1rem;
		width: 100%;
		padding: 1rem;
	}

	div {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
	}

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
		background-color: var(--color-c);
		color: var(--color-a);

		font-size: 5rem;

		padding: 1rem 2rem;
		margin-bottom: 4rem;
	}

	@media (width < 610px) {
		main > :global(h1) {
			font-size: 3rem;
		}
	}
</style>
