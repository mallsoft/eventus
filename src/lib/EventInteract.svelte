<script>
	import { enhance } from '$app/forms';
	export let isAdmin;
	export let isLoggedIn;
	export let event;

	let isTooLate = new Date().getTime() >= new Date(event.rsvp_before).getTime();
	let eventIsFull = event.pax >= event.max_pax;
	let canRsvp = !isTooLate && !eventIsFull;

	// $: inFuture = new Date().getTime() < new Date(start_time).getTime();
	// $: inPast = new Date().getTime() > new Date(end_time).getTime();
	// $: inProgress = !inFuture && !inPast;

	// $: canRsvp = new Date().getTime() < new Date(rsvp_before).getTime();
</script>

<div>
	{#if isAdmin}
		<form action="?/eventDelete" method="post" use:enhance>
			<input type="hidden" value={event.id} name="eventId" />
			<button type="submit">Delete event</button>
		</form>
	{/if}
	{#if isLoggedIn}
		<form
			action="?/{event.attending?.length > 0 ? 'eventUnregister' : 'eventRegister'}"
			method="post"
			use:enhance
		>
			<input type="hidden" value={event.id} name="eventId" />
			<button disabled={!canRsvp} type="submit">
				{#if canRsvp}
					{event.attending?.length > 0 ? 'Unregister' : 'Register'}
				{:else}
					Registering closed
				{/if}
			</button>
		</form>
	{/if}
</div>
