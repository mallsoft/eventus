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
			class:isRegistered
		>
			<input type="hidden" value={event.id} name="eventId" />
			<button class:b2={isRegistered} disabled={!canRsvp && !isRegistered} type="submit">
				{#if canRsvp || isRegistered}
					{isRegistered ? 'Unregister' : 'Register'}
				{:else}
					Registering closed
				{/if}
			</button>
		</form>
	</div>
{:else}
	<a href="/account">You need to log in to register for events</a>
{/if}

<style>
	div {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
	}
	.isRegistered {
		margin-left: auto;
	}
	.isRegistered button {
		opacity: 0.75;
		transition: opacity 0.1s;
	}
	.isRegistered button:is(:hover, :active, :focus) {
		opacity: 1;
	}
</style>
