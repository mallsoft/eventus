<script>
	export let event;
	$: ({ created_at, name, description, start_time, end_time, max_pax, rsvp_before } = event);

	$: inFuture = new Date().getTime() < new Date(start_time).getTime();
	$: inPast = new Date().getTime() > new Date(end_time).getTime();
	$: inProgress = !inFuture && !inPast;

	$: canRsvp = new Date().getTime() < new Date(rsvp_before).getTime();
</script>

<!-- 

{
  "id": 5,
  "created_at": "2023-09-18T06:22:12.034956+00:00",
  "name": "Svelte is nice",
  "description": "React is noise",
  "start_time": "2023-09-18T08:20:00+00:00",
  "end_time": "2023-09-18T08:20:00+00:00",
  "max_pax": 12,
  "rsvp_before": "2023-09-18T08:20:00+00:00",
  "publish_on": "2023-09-18T08:20:00+00:00",
  "attendees": [
    {
      "id": 3
    }
  ]
}

 -->

<article class:inPast={1}>
	<h2>
		{name}
	</h2>
	{#if description}
		<p>
			{description}
		</p>
	{/if}
	<ul>
		<li>
			Spots {max_pax}/{max_pax}
		</li>
		<li>
			<!--  -->
		</li>
	</ul>
</article>

<style>
	article {
		min-height: 12rem;
		padding: 1rem;

		position: relative;
	}

	article::before,
	article::after {
		position: absolute;
		content: '';
		width: 1rem;
		height: 1rem;
		border: 0.125rem solid var(--color-c);
		transition: transform 0.2s;
	}

	article::before {
		bottom: 0;
		right: 0;
		border-top: 0;
		border-left: 0;
	}
	article::after {
		top: 0;
		left: 0;
		border-bottom: 0;
		border-right: 0;
	}

	h2 {
		font-size: 2rem;
	}
</style>
