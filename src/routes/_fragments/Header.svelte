<script>
	import { page } from '$app/stores';
	import AvatarAndName from '$lib/AvatarAndName.svelte';
</script>

<header>
	<nav>
		{#if $page.data.event_admin && $page.url.pathname !== '/event-admin'}
			<a href="/event-admin">λ</a>
		{/if}

		<div>
			{#if $page.data.session}
				<a class:current={$page.url.pathname === '/'} href="/"><AvatarAndName /></a>
			{/if}
		</div>
	</nav>
</header>

<style>
	header {
		width: 100%;
		padding: 1rem;
		display: flex;
	}

	nav {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap-reverse;
		flex-grow: 1;

		gap: 0.5rem;
	}

	div {
		display: flex;
		justify-content: space-between;
		gap: 2rem;
		margin-left: auto;
	}

	nav :global(button),
	nav :global(a) {
		padding: 0;
		font-size: 2rem;
		font-weight: inherit;
	}
	nav :global(button) {
		height: 100%;
		background-color: transparent;
	}
</style>
