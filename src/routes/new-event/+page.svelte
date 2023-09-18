<script>
	import { enhance } from '$app/forms';

	export let form;

	const dateTimeFormat = (d) => {
		//why isn't this a part of the datetime-local thing??? YYYY-MM-DDTHH:MM
		const year = d.getFullYear();
		const month = String(d.getMonth() + 1).padStart(2, '0'); // Month is 0-based, so add 1 and pad with '0' if needed
		const day = String(d.getDate()).padStart(2, '0');
		const hour = String(d.getHours()).padStart(2, '0');
		const minute = String(d.getMinutes()).padStart(2, '0');
		return `${year}-${month}-${day}T${hour}:${minute}`;
	};

	const currentTime = dateTimeFormat(new Date());

	let startTime = currentTime;
</script>

<article>
	{#if form?.validationErrors}
		<div class="errorbois">
			<h3>Validation Errors (aka server complaints)</h3>
			<ul>
				{#each form?.validationErrors as err}
					<li>{err}</li>
				{/each}
			</ul>
		</div>
	{/if}
	{#if form?.supabaseErrorMessage}
		<div class="errorbois">
			<h3>Something really isn't woriking...</h3>
			<p>
				{form.supabaseErrorMessage}
			</p>
		</div>
	{/if}

	<form action="?/createEvent" method="POST" use:enhance>
		<label>
			<span>Name</span>
			<input required type="text" name="name" />
		</label>

		<label>
			<span>Description</span>

			<textarea required type="text" name="description" />
		</label>

		<label>
			<span>Max attendees</span>
			<input
				required
				type="number"
				min="1"
				name="maxPax"
				oninput="this.value = this.value.replace(/^[^1-9]/,'')"
			/>
		</label>

		<label>
			<span>Publish</span>
			<input
				required
				type="datetime-local"
				name="publishTime"
				value={currentTime}
				min={startTime}
			/>
		</label>

		<label>
			<span>Rsvp before</span>
			<input required type="datetime-local" name="rsvpTime" value={currentTime} min={startTime} />
		</label>

		<label>
			<span>Start time</span>
			<input
				required
				type="datetime-local"
				name="startTime"
				bind:value={startTime}
				min={currentTime}
			/>
		</label>

		<label>
			<span>End time</span>
			<input required type="datetime-local" name="endTime" value={currentTime} min={startTime} />
		</label>

		<button type="submit">Create event!</button>
	</form>
</article>

<style>
	form {
		display: grid;
		justify-content: center;
		grid-template-columns: repeat(auto-fit, 30ch);
		gap: 1rem;
		max-width: 900px;
	}
	button {
		grid-column: 1/-1;
	}

	label {
		display: flex;
		flex-direction: column;
	}

	textarea {
		resize: vertical;
	}

	.errorbois {
		padding: 1rem;
		margin: 1rem 0;
		background-color: rgb(255, 161, 161);
		color: rgb(46, 46, 46);
	}
</style>
