<script>
	import { enhance } from '$app/forms';
	import { dateTimeFormat } from '$lib/time.js';

	export let form;

	const currentTime = dateTimeFormat(new Date());

	let startTime = currentTime;
</script>

<h1>Create new event</h1>
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

	<label style:grid-row="span 2">
		<span>Description</span>

		<textarea required type="text" name="description" />
	</label>

	<label>
		<span>Max attendees</span>
		<input
			required
			type="number"
			style="appearance: textfield;"
			min="1"
			max="1000000"
			name="maxPax"
			oninput="this.value = this.value.replace(/^[^1-9]/,'')"
		/>
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

	<label>
		<span>Publish</span>
		<input required type="datetime-local" name="publishTime" value={currentTime} max={startTime} />
	</label>

	<label>
		<span>Rsvp before</span>
		<input required type="datetime-local" name="rsvpTime" value={currentTime} max={startTime} />
	</label>

	<input type="hidden" name="tz" value={new Date().getTimezoneOffset()} />

	<button type="submit">Create event!</button>
</form>

<style>
	form {
		display: grid;
		gap: 2rem;
		grid-template-columns: repeat(auto-fit, max(calc(50% - 1rem), 24ch));
		width: 100%;
		justify-content: center;
	}

	button {
		margin-top: 1rem;
		grid-column: 1/-1;
	}

	label {
		display: flex;
		flex-direction: column;
		font-weight: bold;
		color: var(--color-d);
		gap: 0.5rem;
	}

	label:focus-within {
		color: var(--color-b);
	}

	textarea {
		resize: none;
		height: 100%;
	}

	.errorbois {
		padding: 1rem;
		margin: 1rem 0;
		background-color: rgb(255, 161, 161);
		color: rgb(46, 46, 46);
	}
</style>
