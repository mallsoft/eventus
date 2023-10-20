<script>
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
</script>

{#if $page.data?.session}
	<form action="/auth/?/logout" method="POST" use:enhance>
		<button type="submit" class="contrast outline"> Logout </button>
	</form>
{/if}
