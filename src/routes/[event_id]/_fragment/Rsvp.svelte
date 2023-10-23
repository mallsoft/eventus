<script>
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import LogInGithub from '$lib/LogInGithub.svelte';
	import { validOrgs } from '$lib/validOrgs';

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
			autocomplete="off"
		>
			{#if canRsvp && !isRegistered}
				<fieldset required>
					<legend>Org.</legend>
					{#each validOrgs as orgname}
						<label>
							<span>{orgname}</span>
							<input type="radio" name="org" value={orgname} />
						</label>
					{/each}
				</fieldset>
				<input type="text" name="name" required placeholder="full name" minlength="1" />
				<input
					type="tel"
					name="phone"
					required
					minlength="8"
					maxlength="12"
					placeholder="phone number"
				/>
			{/if}
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
		margin-left: auto;
	}
	form {
		gap: 1rem;
		display: flex;
		flex-direction: column;
	}

	button {
		height: 100%;
	}

	fieldset {
		color: var(--color-b);
		border-color: var(--color-a);
		display: flex;
		gap: 1rem;
	}
</style>
