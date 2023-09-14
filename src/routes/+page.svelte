<script>
	import CreateEvent from '$lib/CreateEvent.svelte';
	import EventList from '$lib/EventList.svelte';
	export let data;
</script>

{#if data.event_admin}
	<CreateEvent />
{/if}

<EventList {data} />
