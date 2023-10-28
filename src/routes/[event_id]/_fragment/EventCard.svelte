<script>
	export let name;
	export let description;
</script>

<article>
	<h2>
		{name}
	</h2>

	<p>
		{description}
	</p>

	<slot />
</article>

<style>
	h2 {
		font-size: 2.5rem;
		color: var(--color-b);
		margin-bottom: 0.5rem;
	}

	article {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 1rem;

		min-height: 12rem;
		padding: 1.5rem;

		word-wrap: break-word;
	}

	@media (width < 710px) {
		article {
			padding: 1rem;
		}
	}

	article > p {
		font-size: 1.4rem;
		color: var(--color-d);

		white-space: pre-wrap;
		margin-bottom: 2rem;
		margin-top: 1rem;
		line-height: 1.25;
	}
</style>
