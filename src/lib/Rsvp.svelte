<script>
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import LogInGithub from './LogInGithub.svelte';
	export let event;

	$: isTooLate = new Date().getTime() >= new Date(event.rsvp_before).getTime();
	$: eventIsFull = event.pax >= event.max_pax;
	$: canRsvp = !isTooLate && !eventIsFull;
	$: isRegistered = event.attending?.length > 0;
</script>

{#if $page.data?.session}
	{#if canRsvp}
		<div>
			<form
				action="?/{event.attending?.length > 0 ? 'eventUnregister' : 'eventRegister'}"
				method="post"
				use:enhance
				class:isRegistered
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
{:else}
	<h2>Log in to register</h2>
	<LogInGithub />
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
