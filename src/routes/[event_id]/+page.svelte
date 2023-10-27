<script>
	import { page } from '$app/stores';

	import Rsvp from './_fragment/Rsvp.svelte';
	import Chips from './_fragment/Chips.svelte';
	import EventCard from './_fragment/EventCard.svelte';

	export let data;
	export let form;
</script>

<EventCard name={data.event?.name} description={data.event?.description}>
	<Chips event={data.event} />
	<div>
		{#if data.event.attending.length > 0}
			<a class="buttony" href="{$page.params.event_id}/ticket">Show Ticket</a>
		{/if}

		<Rsvp {form} />
	</div>
</EventCard>

<style>
	div {
		display: flex;
	}
	a {
		margin-top: auto;
	}
</style>
