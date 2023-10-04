<script>
	export let data;
</script>

{#if !data.session}
	<h1>Log in with...</h1>
	<form action="?/loginGithub" method="POST">
		<button type="submit">Github</button>
	</form>
{:else}
	<h1>Account</h1>
	<h2>Logged in as</h2>
	<br />
	<pre>
		{JSON.stringify(data.session.user, null, 2)}
	</pre>
{/if}

<style>
	pre {
		background-color: black;
		color: white;
	}
</style>
