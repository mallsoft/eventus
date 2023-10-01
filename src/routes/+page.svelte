<script>
	import EventCard from './_fragments/EventCard.svelte';
	import Rsvp from './_fragments/Rsvp.svelte';

	export let data;
</script>

<svelte:head>
	<title>Godzilla Events</title>
</svelte:head>

<h1>{!data?.events.length ? 'No listed events.' : 'Current events'}</h1>
<ol>
	{#each data?.events as event}
		<li>
			<EventCard {event} />
		</li>
	{/each}
</ol>

<style>
	ol {
		display: flex;
		flex-direction: column;
		gap: 4rem;

		width: 100%;
	}

	li {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}
</style>
