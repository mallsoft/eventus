<script>
	import { eventTime } from './eventTime';

	export let event;

	$: ({ max_pax, pax, attending } = event);
	$: isRegistered = attending?.length > 0;

	$: ({ isAfterRsvp, startEndRange, rsvpTime } = eventTime(event));
</script>

<ul class="chips">
	<!-- is registered info -->
	{#if isRegistered}
		<li class="registered"><b>Attending</b></li>
	{/if}
	<!-- event time -->
	<li>
		<span>When</span>
		<time datetime={startEndRange.toString()}>{startEndRange.toString()}</time>
	</li>
	<!-- seats -->
	{#if !isAfterRsvp}
		<li>
			<b>{max_pax - pax}</b>
			<span>Seat{max_pax - pax === 1 ? '' : 's'} remaining</span>
		</li>
	{/if}
	<!-- seats -->
	{#if !isAfterRsvp}
		<li>
			<b>Register before</b>
			<span>{rsvpTime}</span>
		</li>
	{/if}
</ul>

<style>
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

	.chips .registered {
		background-color: var(--color-ok-bg);
		color: var(--color-ok-text);
		position: relative;
	}
	.chips .registered::after {
		content: '🎉';
		position: absolute;
		top: -1em;
		right: -0.7em;
	}
</style>
