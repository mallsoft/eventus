<script>
	export let data;
</script>

<h1>Administration</h1>

{#if data.events}
	<ol>
		{#each data.events as { id, name, max_pax, pax, publish_on }}
			{@const isPublished = new Date() > new Date(publish_on)}
			<li>
				<h2>
					<a href="/{id}">{name}</a>
				</h2>
				<ul>
					{#if isPublished}
						<li>Published</li>
					{/if}
					<li>Registered {pax} / {max_pax}</li>
				</ul>
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

	ol li {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		border: 1px solid transparent;
	}

	ol li div {
		display: flex;
		gap: 1rem;
	}

	ul {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5em;
		font-size: 0.895em;
	}

	ul li {
		padding: 0.125em 0.25em;
		color: var(--color-a);
		background-color: var(--color-b);
	}
</style>
