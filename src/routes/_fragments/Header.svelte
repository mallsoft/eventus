<script>
	import { page } from '$app/stores';
	import LogInOut from '../../lib/LogInOut.svelte';
</script>

<header>
	<nav>
		{#if $page.url.pathname !== '/'}
			<a class="buttony" href="/">Index</a>
		{/if}

		{#if $page.data.event_admin && $page.url.pathname !== '/event'}
			<a class="buttony" href="/event">Event edit</a>
		{/if}
	</nav>
	<LogInOut />
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;

		flex-wrap: wrap-reverse;

		gap: 0.5rem;
		width: 100%;
		padding: 1rem;
	}

	nav {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	nav a {
		display: flex;
		height: 100%;
		align-items: center;
	}
</style>
