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
		{#if count}
			<h2>Attending {count} event{count !== 1 ? 's' : ''}</h2>
		{:else}
			<h2>No events registered</h2>
			<p>To register for an event you should have recieved an event link trough email</p>
		{/if}

		<ul>
			{#each events as { name, id }}
				<li>
					<a class="buttony" href={id}>
						{name}
					</a>
					<a class="buttony" href="{id}/ticket">Show Ticket</a>
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
		padding: 2rem;
		background-color: var(--color-d);
		color: var(--color-c);
	}

	h2 {
		color: var(--color-d);
		padding: 1rem;
	}

	ul {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	li {
		display: flex;
		gap: 1rem;
	}

	li a:first-of-type {
		flex-grow: 1;
		justify-content: flex-start;
	}

	div {
		margin-top: 8rem;
		margin-left: auto;
	}
</style>
