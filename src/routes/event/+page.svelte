<script>
	export let data;
</script>

<h1>All events</h1>

<a href="/event/create"> new event </a>

{#if data.events}
	{#each data.events as { id, name }}
		<a href="/event/{id}">
			{name}
		</a>
	{/each}
{/if}
