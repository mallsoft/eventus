<script>
	import { enhance } from '$app/forms';

	export let data;
</script>

<article>
	<h2>Events</h2>
	<ol>
		{#each data?.events as event}
			<li>
				<pre>{JSON.stringify(event, null, 2)}</pre>

				<div>
					{#if data.event_admin}
						<form action="?/eventDelete" method="post" use:enhance>
							<input type="hidden" value={event.id} name="eventId" />
							<button type="submit">Delete event</button>
						</form>
					{/if}
					<form
						action="?/{event.attendees?.lenght > 0 ? 'eventUnregister' : 'eventRegister'}"
						method="post"
						use:enhance
					>
						<input type="hidden" value={event.id} name="eventId" />
						<button type="submit">{event.attendees?.length > 0 ? 'Unregister' : 'Register'}</button>
					</form>
				</div>
			</li>
		{/each}
	</ol>
</article>

<style>
	article {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	ol {
		max-width: 900px;
		width: 100%;
	}

	li {
		background-color: rgb(60, 60, 60);
	}
	pre {
		background-color: rgb(60, 60, 60);
		color: rgb(0, 255, 100);
		border-radius: 6px;
	}

	div {
		display: flex;
		gap: 4px;
	}
</style>
