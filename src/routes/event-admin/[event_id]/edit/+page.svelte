<script>
	import { dateTimeFormat } from '$lib/time';
	import EventForm from '../../_fragments/EventForm.svelte';
	// import EventImage from '../../_fragments/EventImage.svelte';

	export let data;

	$: ({ id, description, end_time, max_pax, name, publish_on, rsvp_before, start_time } =
		data.event_edit[0]);
</script>

<h1>Edit Event</h1>

<!-- <EventImage /> -->

<EventForm
	action="?/editEvent"
	{name}
	{description}
	startTime={dateTimeFormat(start_time)}
	endTime={dateTimeFormat(end_time)}
	maxPax={max_pax}
	publishTime={dateTimeFormat(publish_on)}
	rsvpTime={dateTimeFormat(rsvp_before)}
/>

<form action="/event-admin/{id}/edit/?/eventDelete" method="post">
	<input type="text" pattern={name} required placeholder="event name" />
	<button>Delete ✖</button>
</form>

<style>
	form {
		display: flex;
		justify-content: space-between;
		margin-top: 3rem;
		margin-left: auto;
		gap: 0.5rem;
	}
	input {
		display: block;
	}

	input[type='text']:invalid ~ button {
		background-color: var(--color-err-bg);
		color: var(--color-err-text);
		opacity: 0.7;
		pointer-events: none;
	}
</style>
