<script>
	export let data;
</script>

<h1>Administration</h1>

{#if data.events}
	<ol>
		{#each data.events as { id, name, description }}
			<li>
				<a href="/event-admin/{id}/edit">
					<h2>{name}</h2>
					<p>{description}</p>
				</a>
			</li>
		{/each}
	</ol>
{/if}

<a class="buttony" href="/event-admin/create">Create new event +</a>

<style>
	a {
		margin-top: 3rem;
	}

	ol {
		display: flex;
		flex-direction: column;
		gap: 1rem;

		width: 100%;
	}

	li {
		display: flex;
		gap: 0.25rem;
	}

	li > a {
		margin-top: auto;
		border: 1px solid var(--color-c);
		padding: 1rem;
		flex-grow: 1;

		text-decoration: none;
	}

	li:is(:hover, :focus-within) {
		background-color: var(--color-c);
	}

	li:is(:hover, :focus-within) h2 {
		color: var(--color-d);
	}
</style>
