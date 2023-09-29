<script>
	import { dateTimeFormat } from '$lib/time';
	import EventForm from '../_fragments/EventForm.svelte';

	export let data;
	$: ({ description, end_time, max_pax, name, publish_on, rsvp_before, start_time } =
		data.event_edit[0]);
</script>

<h1>Edit <i>{name}</i></h1>

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
