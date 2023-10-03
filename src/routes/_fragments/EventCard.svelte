<script>
	import Rsvp from './Rsvp.svelte';

	export let event;
	$: ({ name, description, start_time, end_time, max_pax, pax, rsvp_before } = event);

	const opts = {
		year: '2-digit',
		month: 'numeric',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric'
	};
	const dt = new Intl.DateTimeFormat(undefined, opts);

	$: range = dt.formatRange(new Date(start_time), new Date(end_time));
	$: rsvp = dt.format(new Date(rsvp_before));

	$: isTooLate = new Date().getTime() >= new Date(event.rsvp_before).getTime();
</script>

<article>
	<h2>
		{name}
	</h2>

	<p>
		{description}
	</p>

	<section class="chips">
		<!-- seats -->
		{#if !isTooLate && start_time !== rsvp_before}
			<p>
				<b>Register before</b>
				<span>{rsvp}</span>
			</p>
		{/if}
		<!-- event time -->
		<p>
			<span>When</span>
			{range.toString()}
		</p>
		<!-- seats -->
		{#if !isTooLate}
			<p>
				<b>{max_pax - pax}</b>
				<span>Seat{max_pax - pax === 1 ? '' : 's'} remaining</span>
			</p>
		{/if}
	</section>

	<Rsvp {event} />
</article>

<style>
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

	article::before,
	article::after {
		position: absolute;
		content: '';
		width: 1rem;
		height: 1rem;
		border: 0.125rem solid var(--color-c);
		transition: all 0.2s;
	}

	article::before {
		bottom: 0;
		right: 0;
		border-top: 0;
		border-left: 0;
	}
	article::after {
		top: 0;
		left: 0;
		border-bottom: 0;
		border-right: 0;
	}

	article > p {
		font-size: 1.4rem;
		margin-bottom: 1rem;

		color: var(--color-d);
	}

	.chips {
		display: flex;
		flex-wrap: wrap;

		justify-content: flex-end;

		margin-top: auto;

		gap: 0.5rem;
	}
	.chips > p {
		color: var(--color-a);
		background-color: var(--color-b);
		max-width: max-content;

		border-radius: 4px;
		padding: 0.25rem 0.5rem;

		font-weight: 600;
		font-style: normal;
		font-size: 0.95rem;
	}
	.chips > p * {
		font: inherit;
	}
</style>
