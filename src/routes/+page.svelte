<script>
	import { enhance } from '$app/forms';
	import Event from '$lib//Event.svelte';
	import LogInOut from '$lib/LogInOut.svelte';

	export let data;

	console.log(data);
	console.log(data.events);
</script>

<h1>Events</h1>
<ol>
	{#each data?.events as event}
		{@const isTooLate = new Date().getTime() >= new Date(event.rsvp_before).getTime()}
		<!-- {@const eventIsFull = ?? >= event.max_pax} -->
		{@const eventIsFull = false}
		{@const canRsvp = !isTooLate && !eventIsFull}

		<li>
			<Event {event} />

			<div>
				{#if data.event_admin}
					<form action="?/eventDelete" method="post" use:enhance>
						<input type="hidden" value={event.id} name="eventId" />
						<button type="submit">Delete event</button>
					</form>
				{/if}
				{#if data.session}
					<form
						action="?/{event.attendees?.length > 0 ? 'eventUnregister' : 'eventRegister'}"
						method="post"
						use:enhance
					>
						<input type="hidden" value={event.id} name="eventId" />
						<button disabled={!canRsvp} type="submit">
							{#if canRsvp}
								{event.attendees?.length > 0 ? 'Unregister' : 'Register'}
							{:else}
								Registering closed
							{/if}
						</button>
					</form>
				{:else}
					<LogInOut {data} loginText="Log in to register" />
				{/if}
			</div>
		</li>
	{/each}
</ol>

<style>
	ol {
		display: flex;
		flex-direction: column;
		gap: 4rem;

		width: 100%;
	}

	li {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	div {
		display: flex;
		gap: 1rem;
	}
</style>
