<script>
	import { enhance } from '$app/forms';
	export let isLoggedIn;
	export let isAdmin;
	export let event;

	let isTooLate = new Date().getTime() >= new Date(event.rsvp_before).getTime();
	let eventIsFull = event.pax >= event.max_pax;
	let canRsvp = !isTooLate && !eventIsFull;
</script>

<div>
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
	{#if isAdmin}
		<a class="buttony" href="/event/{event.id}">Edit</a>
	{/if}
</div>

<style>
	div {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
	}
</style>
