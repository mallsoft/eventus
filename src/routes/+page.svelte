<script>
	import LogInGithub from '$lib/LogInGithub.svelte';
	import Ticket from './_fragments/Ticket.svelte';

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
					<Ticket {event} />
				</li>
			{/each}
		</ul>
	{/if}
	<!-- -->
{:else}
	<h2>To see events you are attending please log in</h2>
	<LogInGithub />
{/if}

<style>
	h2 {
		margin-bottom: 1rem;
	}
	ul {
		padding: 2rem 0;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	p {
		max-width: fit-content;
		padding: 1rem;
		background-color: var(--color-b);
		color: var(--color-c);
	}
</style>
