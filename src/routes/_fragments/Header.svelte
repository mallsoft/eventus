<script>
	import { page } from '$app/stores';
	import AvatarAndName from '$lib/AvatarAndName.svelte';
	import Logout from '$lib/Logout.svelte';
</script>

<header>
	<nav>
		{#if $page.data.event_admin}
			{#if $page.url.pathname !== '/event-admin'}
				<a class="buttony" href="/event-admin">⚙️</a>
			{/if}
		{/if}

		<div>
			{#if $page.data.session}
				<Logout />
				<a class="buttony" class:current={$page.url.pathname === '/'} href="/"><AvatarAndName /></a>
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
		flex-wrap: wrap-reverse;
		flex-grow: 1;

		gap: 0.5rem;
	}

	div {
		display: flex;
		justify-content: space-between;
		gap: 0.5rem;
		margin-left: auto;
	}

	div :global(button) {
		height: 100%;
	}
	[href='/'] {
		background-color: transparent;
	}
</style>
