<script>
	import EventCard from './_fragment/EventCard.svelte';
	export let data;
</script>

<EventCard event={data.event} />
