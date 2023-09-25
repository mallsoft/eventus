<script>
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
	const dt_en = new Intl.DateTimeFormat('en', opts);

	$: range = dt.formatRange(new Date(start_time), new Date(end_time));
	$: rsvp = dt.format(new Date(rsvp_before));
</script>

<article>
	<h2>
		{name}
	</h2>

	<p>
		{description}

		<br />
		<em>rsvp before {rsvp}</em>
	</p>

	<section class="chips">
		<!-- event time -->
		<p>
			<span>ET</span>
			{range.toString()}
		</p>
		<!-- seats -->
		<p>
			<b>{max_pax - pax}</b> / <span>{max_pax}</span>
			<span>Seats left</span>
		</p>
	</section>
</article>

<style>
	h2 {
		font-size: 2.5rem;
		color: var(--color-e);
		margin-bottom: 0.5rem;
	}

	article {
		min-height: 12rem;
		padding: 1rem;
		color: var(--color-d);

		position: relative;
	}

	article::before,
	article::after {
		position: absolute;
		content: '';
		width: 1rem;
		height: 1rem;
		border: 0.125rem solid var(--color-c);
		transition: transform 0.2s;
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
	}
	article > p em {
		font-size: 1rem;
	}

	.chips {
		display: flex;
		flex-direction: column;
		align-items: flex-end;

		gap: 0.5rem;
	}
	.chips > p {
		color: var(--color-a);
		background-color: var(--color-e);
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
