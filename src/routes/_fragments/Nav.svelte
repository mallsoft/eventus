<script>
	import { page } from '$app/stores';
	import LogInOut from '../../lib/LogInOut.svelte';
</script>

<nav>
	<div>
		{#if $page.url.pathname !== '/'}
			<a class="buttony" href="/">Events</a>
		{/if}

		{#if $page.data.event_admin}
			<a class="buttony" href="/event">Event edit</a>
		{/if}
	</div>

	<div>
		<LogInOut />
	</div>
</nav>

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
</style>
