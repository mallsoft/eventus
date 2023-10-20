<script>
	import { onMount } from 'svelte';
	import { invalidateAll } from '$app/navigation';
	import Logout from '$lib/Logout.svelte';

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
	<h1>DNB invites</h1>

	{#if data?.events}
		{@const events = data?.events}
		{@const count = data?.events.length}
		<h2>You are registered to {count} event{count !== 1 ? 's' : ''}</h2>
		{#if count === 0}
			<p>To register for an event you will have recieved an event link trough email or qr-code</p>
		{/if}

		<ul>
			{#each events as { name, id }}
				<li><a href={id}>{name}</a></li>
			{/each}
		</ul>
	{/if}
{:else}
	<h1>No session</h1>
	<h2>Please log in to see your events</h2>
{/if}

<style>
	ul {
		padding: 2rem 0;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	p {
		padding: 3rem 0;
	}
</style>
