<script>
	export let data;
</script>

<h1>Administration</h1>

{#if data.events}
	<ol>
		{#each data.events as { id, name }}
			<li>
				<h2><a href="/{id}">{name}</a></h2>
				<div>
					<a class="buttony" href="/event-admin/{id}/edit">Edit</a>
				</div>
			</li>
		{/each}
	</ol>
{/if}

<a class="buttony" href="/event-admin/create">Create new event +</a>

<style>
	ol {
		margin-bottom: 3rem;
	}

	ol {
		display: flex;
		flex-direction: column;
		gap: 3rem;

		width: 100%;
	}

	li {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		border: 1px solid transparent;
	}

	li div {
		display: flex;
		gap: 1rem;
	}
</style>
