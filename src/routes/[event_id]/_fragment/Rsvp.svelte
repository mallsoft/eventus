<script>
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import LogInGithub from '$lib/LogInGithub.svelte';
	import { validOrgs } from '$lib/validOrgs';

	export let form;

	export let unregisterText = 'Unregister';
	export let registerText = 'Click to register🎉';

	$: isTooLate = new Date().getTime() >= new Date($page.data.event.rsvp_before).getTime();
	$: eventIsFull = $page.data.event.pax >= $page.data.event.max_pax;
	$: canRsvp = !isTooLate && !eventIsFull;
	$: isRegistered = $page.data.event.attending?.length > 0;
</script>

{#if $page.data?.session}
	<form
		action="?/{$page.data.event.attending?.length > 0 ? 'eventUnregister' : 'eventRegister'}"
		method="post"
		use:enhance
		class:isRegistered
		autocomplete="off"
	>
		<h3>Register to event</h3>

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
			<input type="text" name="name" required placeholder="Full name" minlength="1" />
			<input
				type="tel"
				name="phone"
				required
				minlength="8"
				maxlength="12"
				placeholder="Phone number"
			/>
		{/if}

		<input type="hidden" value={$page.data.event.id} name="eventId" />

		<button disabled={isTooLate || eventIsFull} type="submit">
			{#if isTooLate || eventIsFull}
				{isRegistered ? 'Registered' : 'Registering closed'}
			{:else}
				{isRegistered ? unregisterText : registerText}
			{/if}
		</button>
	</form>
	{#if form?.message && !form?.success}
		<p class="errorbois">{form.message}</p>
	{/if}
{:else}
	<LogInGithub />
{/if}

<style>
	form {
		gap: 1rem;
		display: flex;
		flex-direction: column;
		margin-left: auto;
		margin-top: 1rem;
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

	.errorbois {
		width: fit-content;
		margin-left: auto;
		background-color: var(--color-err-bg);
		color: var(--color-err-text);
	}
</style>
