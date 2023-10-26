<script>
	import EventCard from './_fragment/EventCard.svelte';
	export let data;
</script>

<EventCard event={data.event} />
{#if data.ticket?.qr}
	<div>
		{@html data.ticket.qr}
	</div>
{/if}

<style>
	div {
		max-width: 200px;
		width: 100%;
		margin-left: auto;
		padding: 0 1rem;
	}
	div :global(path:first-of-type) {
		fill: var(--color-c);
	}
	div :global(path:last-of-type) {
		stroke: var(--color-a);
	}
</style>
