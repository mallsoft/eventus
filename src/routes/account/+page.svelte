<script>
	export let data;
	export let form;
</script>

{#if !data.session}
	{#if !form.linkSent}
		<h1>Log in with...</h1>

		<section>
			<h2>Email</h2>

			<!-- magic link -->
			<form class="magic" action="?/loginMagicLink" method="POST">
				<input required type="email" name="email" placeholder="email@example.com" />
				<button type="submit">Go!</button>
			</form>

			<h2>Or</h2>
			<!-- github -->
			<form action="?/loginGithub" method="POST">
				<button type="submit">Github</button>
			</form>
		</section>
	{:else}
		<h1>Magic link sendt!</h1>
	{/if}
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

	section {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.magic {
		display: flex;
	}

	[type='email']:invalid ~ button {
		opacity: 0.6;
		pointer-events: none;
	}
</style>
