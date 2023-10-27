<script>
	import { page } from '$app/stores';
</script>

{#if $page.data?.session}
	{@const username = $page.data.session?.user?.user_metadata?.user_name ?? '--'}
	{@const avatar = $page.data.session?.user?.user_metadata?.avatar_url}

	<div>
		<p>
			{username}
		</p>
		<img src={avatar} alt="avatar" />
	</div>
{/if}

<style>
	div {
		display: flex;
		align-items: center;
		font-size: 1em;
		gap: 0.5em;

		max-width: fit-content;
		position: relative;
	}

	img {
		height: 1.25em;
		width: 1.25em;
		border-radius: 100%;
		border: 2px solid currentColor;
	}
</style>
