<script>
	import { enhance } from '$app/forms';
	export let data;

	export let loginText = '';
	export let logoutText = '';
</script>

{#if !data.session}
	<form action="/?/login" method="POST">
		<button type="submit">
			{#if loginText}
				{loginText}
			{:else}
				Login
			{/if}
		</button>
	</form>
{:else}
	{@const username = data?.session?.user?.user_metadata?.user_name ?? ''}
	<form action="/?/logout" method="POST" use:enhance>
		<button type="submit" class="contrast outline">
			{#if !logoutText}
				logout
				{#if username}
					<strong>{username}</strong>
				{/if}
			{:else}
				{logoutText}
			{/if}
		</button>
	</form>
{/if}
