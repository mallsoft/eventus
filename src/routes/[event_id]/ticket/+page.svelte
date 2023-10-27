<script>
	export let data;
</script>

{#if data.ticket?.qr}
	{@const { qr, meta, reference } = data.ticket}
	<h2>{meta?.name}</h2>
	<div>
		{@html qr}
	</div>
	<span>{reference}</span>
{:else}
	<div>Ticket error</div>
{/if}

<style>
	h2 {
		margin: auto;
		color: var(--color-d);
	}
	div {
		max-width: 500px;
		width: 100%;
		margin: 1rem auto;
	}

	span {
		margin: auto;
		color: var(--color-c);
	}

	div :global(path:first-of-type) {
		fill: var(--color-b);
	}
	div :global(path:last-of-type) {
		stroke: var(--color-a);
	}
</style>
