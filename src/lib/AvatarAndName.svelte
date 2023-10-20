<script>
	import { page } from '$app/stores';
</script>

{#if $page.data?.sessio}
	{@const admin = $page.data.event_admin}
	{@const username = $page.data.session?.user?.user_metadata?.user_name ?? '--'}
	{@const avatar = $page.data.session?.user?.user_metadata?.avatar_url}

	<div class:admin>
		<img src={avatar} alt="avatar" />

		<p>
			{username}
		</p>
	</div>
{/if}
