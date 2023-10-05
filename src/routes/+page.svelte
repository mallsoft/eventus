<script>
	import { onMount } from 'svelte';
	import EventCard from './_fragments/EventCard.svelte';
	import { invalidateAll } from '$app/navigation';

	export let data;

	$: ({ supabase } = data);
	onMount(() => {
		const events = supabase
			.channel('event-channel')
			.on('postgres_changes', { event: '*', schema: 'public', table: 'events' }, () => {
				invalidateAll();
			})
			.subscribe();

		return () => events.unsubscribe();
	});
</script>

<svelte:head>
	<title>DNB Events</title>
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
