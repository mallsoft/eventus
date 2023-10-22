<script>
	import Rsvp from '../../../lib/Rsvp.svelte';

	export let event;
	$: ({ name, description, start_time, end_time, max_pax, pax, rsvp_before, attending } = event);
	$: isRegistered = attending?.length > 0;

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

	<p class="desc">
		{description}
	</p>

	<ul class="chips">
		<!-- seats -->
		{#if !isTooLate && start_time !== rsvp_before && !isRegistered}
			<li>
				<b>Register before</b>
				<span>{rsvp}</span>
			</li>
		{/if}
		<!--  -->
		{#if isRegistered}
			<li><b>You are registered!</b></li>
		{/if}
		<!-- event time -->
		<li>
			<span>When</span>
			{range.toString()}
		</li>
		<!-- seats -->
		{#if !isTooLate}
			<li>
				<b>{max_pax - pax}</b>
				<span>Seat{max_pax - pax === 1 ? '' : 's'} remaining</span>
			</li>
		{/if}
	</ul>

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

	article > p {
		font-size: 1.4rem;
		color: var(--color-d);
	}

	.chips {
		display: flex;
		flex-wrap: wrap;

		justify-content: flex-end;

		margin-top: auto;

		gap: 0.5rem;
	}
	.chips > li {
		color: var(--color-a);
		background-color: var(--color-b);
		max-width: max-content;

		border-radius: 4px;
		padding: 0.25rem 0.5rem;

		font-weight: 600;
		font-style: normal;
	}
	.chips > li * {
		font: inherit;
	}

	.desc {
		white-space: pre-wrap;
		margin-bottom: 2rem;
		margin-top: 1rem;
	}
</style>
