<script>
	export let data;
	export let form;
</script>

{#if !data.session}
	{#if !form?.linkSent}
		<h1>Log in with...</h1>

		<section>
			<div>
				<h2>Email (magic link)</h2>

				<!-- magic link -->
				<form class="magic" action="?/loginMagicLink" method="POST">
					<input required type="email" name="email" placeholder="email@example.com" />
					<button type="submit">Go!</button>
				</form>
			</div>

			<div>
				<h2>Or preferably</h2>
				<!-- github -->
				<form action="?/loginGithub" method="POST">
					<button type="submit"
						><svg viewBox="-1 0 100 100">
							<path
								d="M49 0a49 49 0 0 0-15 96c2 0 3-1 3-2V84c-14 3-17-5-17-5-2-6-5-8-5-8-5-3 0-3 0-3 5 1 8 5 8 5 4 8 11 6 14 4 0-3 2-5 3-6-11-1-22-5-22-24 0-6 2-10 5-14-1-1-2-6 0-13 0 0 4-1 14 5a47 47 0 0 1 12-1l12 1c9-6 13-5 13-5 3 7 1 12 1 13 3 4 5 8 5 14 0 19-11 23-22 24 1 1 3 4 3 9v14c0 1 1 2 3 2A49 49 0 0 0 49 0z"
								clip-rule="evenodd"
							/>
						</svg>
						<span>Github</span>
					</button>
				</form>
			</div>
		</section>
	{:else}
		<h1>Code sent!</h1>
		<h2>Check your inbox 👀</h2>
		<form action="?/verifyOTP" method="post">
			<input type="hidden" name="email" value={form?.email} />
			<input required type="text" name="otp" placeholder="OTP Code!" />
			<button type="submit">Use code</button>
		</form>
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
		flex-wrap: wrap;
		gap: 2rem;
	}

	.magic {
		display: flex;
	}

	[type='email']:invalid ~ button {
		opacity: 0.6;
		pointer-events: none;
	}

	[action='?/loginGithub'] button {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	[action='?/loginGithub'] button svg {
		width: 1.5rem;
		height: 1.5rem;
		fill: currentColor;
	}

	div {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
</style>
