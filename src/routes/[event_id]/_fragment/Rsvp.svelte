<script>
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import LogInGithub from '$lib/LogInGithub.svelte';

	export let unregisterText = 'Unregister';
	export let registerText = 'Click to register🎉';

	$: isTooLate = new Date().getTime() >= new Date($page.data.event.rsvp_before).getTime();
	$: eventIsFull = $page.data.event.pax >= $page.data.event.max_pax;
	$: canRsvp = !isTooLate && !eventIsFull;
	$: isRegistered = $page.data.event.attending?.length > 0;
</script>

{#if $page.data?.session}
	<div>
		<form
			action="?/{$page.data.event.attending?.length > 0 ? 'eventUnregister' : 'eventRegister'}"
			method="post"
			use:enhance
			class:isRegistered
		>
			<input type="hidden" value={$page.data.event.id} name="eventId" />
			<button disabled={!canRsvp && !isRegistered} type="submit">
				{#if canRsvp || isRegistered}
					{isRegistered ? unregisterText : registerText}
				{:else}
					Registering closed
				{/if}
			</button>
		</form>
	</div>
{:else}
	<LogInGithub />
{/if}

<style>
	div {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
	}

	button {
		height: 100%;
	}
</style>
