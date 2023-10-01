<script>
	import { dateTimeFormat } from '$lib/time';
	import EventForm from '../_fragments/EventForm.svelte';

	export let data;
	$: ({ id, description, end_time, max_pax, pax, name, publish_on, rsvp_before, start_time } =
		data.event_edit[0]);
</script>

<h1>Edit Event</h1>
<h2>{name} ({pax}/{max_pax})</h2>

<EventForm
	{name}
	{description}
	startTime={dateTimeFormat(start_time)}
	endTime={dateTimeFormat(end_time)}
	maxPax={max_pax}
	publishTime={dateTimeFormat(publish_on)}
	rsvpTime={dateTimeFormat(rsvp_before)}
	edit
/>
<div>
	<form action="/event/{id}/?/eventDelete" method="post">
		<input type="text" pattern={name} required placeholder="event name" />
		<!-- <input type="hidden" value={id} /> -->
		<button>Delete ✖</button>
	</form>
</div>

<style>
	div {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		margin: 2rem 0;
	}
	form {
		display: flex;
		justify-content: space-between;
		margin-left: auto;
	}
	input {
		display: block;
	}
</style>
