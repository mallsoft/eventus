<script>
	export let data;
</script>

<section>
	<h2>Events</h2>
	<ol>
		{#each data?.events as event}
			<!-- {@const { name, description, start_time, end_time } = event} -->
			<li>
				<pre>{JSON.stringify(event, null, 2)}</pre>
			</li>
		{/each}
	</ol>
</section>

<style>
	pre {
		background-color: rgb(24, 24, 24);
		color: rgb(0, 255, 85);
		border-radius: 6px;
	}
</style>
