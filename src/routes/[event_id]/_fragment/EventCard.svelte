<script>
	import Rsvp from './Rsvp.svelte';
	import Chips from './Chips.svelte';

	export let event;
	$: ({ name, description } = event);
</script>

<article>
	<h2>
		{name}
	</h2>

	<p class="desc">
		{description}
	</p>

	<Chips {event} />
	<div>
		<Rsvp {event} />
	</div>
</article>

<style>
	div {
		display: flex;
		justify-content: flex-end;
	}
	h2 {
		font-size: 2.5rem;
		color: var(--color-b);
		margin-bottom: 0.5rem;
	}

	article {
		display: flex;
		flex-direction: column;
		gap: 1rem;

		min-height: 12rem;
		padding: 1.5rem;

		position: relative;
	}

	@media (width < 710px) {
		article {
			padding: 1rem;
		}
	}

	article > p {
		font-size: 1.4rem;
		color: var(--color-d);
	}

	.desc {
		white-space: pre-wrap;
		margin-bottom: 2rem;
		margin-top: 1rem;
	}
</style>
