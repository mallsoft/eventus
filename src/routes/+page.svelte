<script>
	import LogInGithub from '$lib/LogInGithub.svelte';
	import Logout from '$lib/Logout.svelte';

	export let data;
</script>

<h1>DNB Event</h1>
{#if data.session}
	<!-- events -->
	{#if data?.events}
		{@const events = data?.events}
		{@const count = data?.events.length}
		<!--  -->
		<h2>Attending {count} event{count !== 1 ? 's' : ''}</h2>
		{#if count === 0}
			<p>To register for an event you should have recieved an event link trough email</p>
		{/if}

		<ul>
			{#each events as event}
				<li>
					<a class="buttony" href={event.id}>
						{event.name}
					</a>
				</li>
			{/each}
		</ul>
	{/if}
	<div>
		<Logout />
	</div>
	<!-- -->
{:else}
	<h2>To see events you are attending please log in</h2>
	<LogInGithub />
{/if}

<style>
	p {
		max-width: fit-content;
		padding: 1rem;
		background-color: var(--color-b);
		color: var(--color-c);
	}

	h2 {
		padding: 1rem;
	}
	ul {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	a {
		width: 100%;
		justify-content: flex-start;
	}

	div {
		margin-top: 3rem;
		margin-left: auto;
	}
</style>
