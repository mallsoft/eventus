<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import OneArmed from '$lib/OneArmed.svelte';
</script>

<h1>😬 {$page.status}: {$page.error.message}</h1>

<section>
	<h2>Errortainment</h2>
	<OneArmed
		coin={100}
		on:gameover={() => {
			goto('/');
		}}
	/>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	h2 {
		margin-bottom: 2rem;
		color: var(--color-d);
	}
</style>
