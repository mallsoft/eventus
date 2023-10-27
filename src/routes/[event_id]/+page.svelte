<script>
	import Rsvp from './_fragment/Rsvp.svelte';
	import Chips from './_fragment/Chips.svelte';
	import EventCard from './_fragment/EventCard.svelte';
	export let data;
	export let form;
</script>

<EventCard name={data.event?.name} description={data.event?.description}>
	<Chips event={data.event} />
	<Rsvp {form} />
	{#if data.ticket?.qr}
		<div>
			{@html data.ticket.qr}
		</div>
	{/if}
</EventCard>

<style>
	div {
		max-width: 200px;
		width: 100%;
		margin-left: auto;
	}
	div :global(path:first-of-type) {
		fill: var(--color-c);
	}
	div :global(path:last-of-type) {
		stroke: var(--color-a);
	}
</style>
