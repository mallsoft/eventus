<script>
	import { page } from '$app/stores';
	import LogInOut from './LogInOut.svelte';

	export let data;
</script>

<nav>
	<div>
		{#if data.event_admin && $page.url.pathname !== '/event/create'}
			<a class="buttony" href="/event/create">Event Creation</a>
		{/if}

		{#if $page.url.pathname !== '/'}
			<a class="buttony" href="/">Events</a>
		{/if}
	</div>

	<div>
		<LogInOut {data} />
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
