<script>
	import { page } from '$app/stores';
	import LogInGithub from '$lib/LogInGithub.svelte';
	import Logout from '$lib/Logout.svelte';
</script>

<header>
	<nav>
		{#if $page.data.event_admin}
			<a class="buttony" href="/">Landing</a>
			<a class="buttony" href="/event-admin">Event edit</a>
		{/if}

		<Logout />
		<LogInGithub />
	</nav>
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
