<script>
	import EventCard from '$lib/EventCard.svelte';
	import EventInteract from '$lib/EventInteract.svelte';

	export let data;
</script>

<svelte:head>
	<title>Godzilla Events</title>
</svelte:head>

<h1>Events</h1>
<ol>
	{#each data?.events as event}
		<li>
			<EventCard {event} />
			<EventInteract {event} isAdmin={!!data?.event_admin} isLoggedIn={!!data?.session} />
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
