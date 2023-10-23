<script>
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import LogInGithub from '../../../lib/LogInGithub.svelte';
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
			<button disabled={!canRsvp && !isRegistered} type="submit">
				{#if canRsvp || isRegistered}
					{isRegistered ? 'Unregister' : 'Click to register🎉'}
				{:else}
					Registering closed
				{/if}
			</button>
		</form>
	</div>
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

	.isRegistered button {
		background-color: var(--color-err-bg);
		color: var(--color-err-text);
	}
	.isRegistered button:is(:hover, :active, :focus) {
		opacity: 0.85;
	}
</style>
