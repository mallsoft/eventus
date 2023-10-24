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
		font-size: 1.25rem;
		gap: 0.5rem;

		max-width: fit-content;

		position: relative;
	}

	img {
		height: 2rem;
		width: 2rem;
		border-radius: 100%;
	}
</style>
