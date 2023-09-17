<script>
	//  { name, description, start_time, end_time } = event
</script>

<article>
	<h3>
		{name}
	</h3>
	{#if description}
		<p>
			<span>
				{max_pax > 0 ? 1 : 0}
			</span> <br />
			{description}
		</p>
	{/if}
</article>
