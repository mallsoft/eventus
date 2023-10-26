<script>
	export let data;
</script>

<h1>Administration</h1>

{#if data.events}
	<ol>
		{#each data.events as { id, name, max_pax, pax }}
			<li>
				<h2>
					<a href="/{id}">{name}</a>
				</h2>
				<p>
					Registered ({pax}/{max_pax})
				</p>
				<div>
					<a class="buttony" href="/event-admin/{id}/edit">Edit</a>
				</div>
			</li>
		{/each}
	</ol>
{/if}

<a class="buttony" href="/event-admin/create">Create new event +</a>

<style>
	h2 {
		font-size: 1.5rem;
	}

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
