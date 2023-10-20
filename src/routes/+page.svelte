<script>
	import { onMount } from 'svelte';
	import { invalidateAll } from '$app/navigation';
	import LogInGithub from '$lib/LogInGithub.svelte';

	export let data;

	$: ({ supabase } = data);
	onMount(() => {
		const events = supabase
			.channel('event-channel')
			.on('postgres_changes', { event: '*', schema: 'public', table: 'events' }, () => {
				invalidateAll();
			})
			.subscribe();

		return () => events.unsubscribe();
	});
</script>

{#if data.session}
	{@const name = data.session.user?.user_metadata?.user_name}
	<h1>Hello {name}!</h1>

	{#if data?.events}
		{@const events = data?.events}
		{@const count = data?.events.length}
		<h2>You are registered to {count} event{count > 1 ? 's' : ''}</h2>

		{#each events as { name, id }}
			<a href={id}>{name}</a>
		{/each}
	{/if}
{:else}
	<h1>Welcome to DNB invites</h1>
{/if}
