<script>
	import { enhance } from '$app/forms';

	export let data;
	export let form;

	$: hasTicket = data.ticketInfo;
	$: registered = data.registered;
</script>

<h1 class:noTicket={!hasTicket} class:registered>
	{#if hasTicket}
		{registered ? 'User is registered👍' : 'Ticket found🎉'}
	{:else}
		Potential spy detected!
		<span>🚨</span>
	{/if}
</h1>

<pre>
Ticket data:
  {JSON.stringify(data.ticketInfo, null, 1)}
</pre>

<form action={registered ? '?/removeAttendance' : '?/registerAttendance'} method="post" use:enhance>
	<button type="submit">
		{registered ? 'Unregister attendance' : 'set Attending'}
	</button>
</form>

{#if form?.message}
	<span class="errorbois">
		{form.message}
	</span>
{/if}

<style>
	h1.noTicket {
		background-color: var(--color-err-bg);
	}
	h1.registered {
		background-color: var(--color-ok-bg);
	}

	h1 span {
		animation: blink 1s infinite alternate;
	}

	@keyframes blink {
		to {
			opacity: 1;
		}
	}

	pre {
		padding: 1rem;
		background-color: rgb(53, 53, 53);
		color: white;
		margin-bottom: 2rem;
		white-space: pre-wrap;
	}

	@media (width < 610px) {
		pre {
			font-size: 0.8em;
		}
	}
</style>
