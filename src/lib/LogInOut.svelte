<script>
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
</script>

{#if !$page.data?.session}
	<!-- log in -->

	<form action="/?/login" method="POST">
		<button type="submit"> Login </button>
	</form>
{:else}
	<!-- log out -->

	{@const username = $page.data.session?.user?.user_metadata?.user_name ?? ''}
	<form action="/?/logout" method="POST" use:enhance>
		<button type="submit" class="contrast outline">
			<span>logout</span>
			{#if username}
				<b>{username}</b>
				<!-- if admin -->

				{$page.data.event_admin ? '*' : ''}
			{/if}
		</button>
	</form>
{/if}
