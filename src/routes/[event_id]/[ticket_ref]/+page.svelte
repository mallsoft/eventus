<script>
	export let data;

	$: hasTicket = !!data.ticketInfo;
</script>

<h1 class:hasTicket>
	{hasTicket ? 'Ticket found' : 'Potential spy detected!'}
</h1>

<pre>
  {JSON.stringify(data.ticketInfo, null, 2)}
</pre>

<style>
	h1:not(.hasTicket) {
		background-color: var(--color-err-bg);
	}
	.hasTicket {
		background-color: var(--color-ok-bg);
	}

	pre {
		background-color: black;
		color: white;
	}
</style>
