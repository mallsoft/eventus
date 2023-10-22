<script>
	import Ticket from './_fragments/Ticket.svelte';

	export let data;
</script>

{#if data.session}
	<h1>DNB invites</h1>
	<!-- events -->
	{#if data?.events}
		{@const events = data?.events}
		{@const count = data?.events.length}
		<!--  -->
		<h2>Attending {count} event{count !== 1 ? 's' : ''}</h2>
		{#if count === 0}
			<p>To register for an event you will have recieved an event link trough email or qr-code</p>
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
	<h1>No session</h1>
	<h2>Please log in to see your events</h2>
{/if}

<style>
	ul {
		padding: 2rem 0;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	p {
		padding: 3rem 0;
	}
</style>
