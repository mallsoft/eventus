<script>
	import { page } from '$app/stores';
</script>

{#if $page.data?.session}
	<form action="/auth/?/logout" method="POST">
		<button type="submit">Logout</button>
	</form>
{/if}
