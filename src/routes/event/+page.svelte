<script>
	export let data;

	const opts = {
		year: '2-digit',
		month: 'numeric',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric'
	};
	const dt = new Intl.DateTimeFormat(undefined, opts);

	const d = (t) => dt.format(new Date(t)).toString();
</script>

{#if data.events}
	<table>
		<tr>
			{#each Object.keys(data.events[0]) as key}
				<th>{key}</th>
			{/each}
		</tr>

		{#each data.events as { id, created_at, name, description, start_time, end_time, max_pax, rsvp_before, publish_on, pax }}
			<tr>
				<td>
					{id}
				</td>
				<td>
					{d(created_at)}
				</td>
				<td>
					{name}
				</td>
				<td>
					{description}
				</td>
				<td>
					{d(start_time)}
				</td>
				<td>
					{d(end_time)}
				</td>
				<td>
					{max_pax}
				</td>
				<td>
					{d(rsvp_before)}
				</td>
				<td>
					{d(publish_on)}
				</td>
				<td>
					{pax}
				</td>
			</tr>
		{/each}
	</table>
{/if}
