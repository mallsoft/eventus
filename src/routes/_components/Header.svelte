<script>
	import { page } from '$app/stores';

	export let data;
</script>

<nav>
	{#if !data.session}
		<form action=".?/login" method="POST">
			<button type="submit">Login</button>
		</form>
	{:else}
		{@const username = data?.session?.user?.user_metadata?.user_name ?? ''}
		<form action=".?/logout" method="POST">
			<button type="submit" class="contrast outline">
				logout
				{#if username}
					<strong>{username}</strong>
				{/if}
			</button>
		</form>
	{/if}

	{#if data.event_admin && $page.url.pathname !== '/new-event'}
		<a href="/new-event">Event Creation</a>
	{/if}

	{#if $page.url.pathname !== '/'}
		<a href="/">Events</a>
	{/if}
</nav>

<style>
	button,
	form {
		margin: 0;
	}

	nav {
		padding: 1rem;
		margin-bottom: 3rem;
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		align-items: center;
		justify-content: space-between;
	}
</style>
