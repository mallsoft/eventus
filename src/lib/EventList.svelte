<script>
	export let data;
</script>

<!-- data.event_admin || show the delete stuff -->
<ol>
	{#each data?.events || [] as event}
		<li>{JSON.stringify(event)}</li>
	{/each}
</ol>

<style>
	ol {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	li {
		padding: 1rem;
		background-color: whitesmoke;
		box-shadow: 10px 10px 10px -8px rgba(0, 0, 0, 0.3);
		border-radius: 4px;
	}
</style>
