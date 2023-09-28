<script>
	import { enhance } from '$app/forms';

	export let data;
	$: event = data.event[0];
</script>

<pre>
  {JSON.stringify(event, null, 2)}
</pre>

<form action="?/eventDelete" method="post" use:enhance>
	<input type="hidden" value={event.id} name="eventId" />
	<button type="submit">Delete event</button>
</form>
