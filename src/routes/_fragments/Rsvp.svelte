<script>
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	export let event;

	$: isTooLate = new Date().getTime() >= new Date(event.rsvp_before).getTime();
	$: eventIsFull = event.pax >= event.max_pax;
	$: canRsvp = !isTooLate && !eventIsFull;
	$: isRegistered = event.attending?.length > 0;
</script>

{#if $page.data?.session}
	<div>
		<form
			action="?/{event.attending?.length > 0 ? 'eventUnregister' : 'eventRegister'}"
			method="post"
			use:enhance
		>
			<input type="hidden" value={event.id} name="eventId" />
			<button disabled={!canRsvp && !isRegistered} type="submit">
				{#if canRsvp || isRegistered}
					{isRegistered ? 'Unregister' : 'Register'}
				{:else}
					Registering closed
				{/if}
			</button>
		</form>
	</div>
{/if}

<style>
	div {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
	}
</style>
