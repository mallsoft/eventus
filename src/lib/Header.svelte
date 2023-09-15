<script>
	export let data;
</script>

<header>
	{#if !data.session}
		<form action=".?/login" method="POST">
			<button type="submit">Login</button>
		</form>
	{:else}
		{@const username = data?.session?.user?.user_metadata?.user_name ?? ''}
		<form action=".?/logout" method="POST">
			<button type="submit">Logout{username ? ': ' + username : ''}</button>
		</form>
	{/if}
</header>

<style>
	header {
		background-color: red;
	}
</style>
