<script>
	import { page } from '$app/stores';
	import LogInOut from './LogInOut.svelte';

	export let data;
</script>

<nav>
	<div>
		{#if data.event_admin && $page.url.pathname !== '/new-event'}
			<a class="buttony" href="/new-event">Event Creation</a>
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
</style>
