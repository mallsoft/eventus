<script>
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { dateTimeFormat } from '$lib/time.js';

	export let action = '';

	const currentTime = dateTimeFormat();

	export let startTime = currentTime;
	export let endTime = currentTime;
	export let name = '';

	const isEdit = name && name.length > 0;

	export let description = '';
	export let maxPax = '';
	export let publishTime = currentTime;
	export let rsvpTime = currentTime;

	$: if (new Date(endTime).getTime() < new Date(startTime).getTime()) endTime = startTime;
</script>

{#if $page.form?.validationErrors}
	<div class="errorbois">
		<h3>Validation Errors (aka server complaints)</h3>
		<ul>
			{#each $page.form?.validationErrors as err}
				<li>{err}</li>
			{/each}
		</ul>
	</div>
{/if}
{#if $page.form?.supabaseErrorMessage}
	<div class="errorbois">
		<h3>Something really isn't working...</h3>
		<p>
			{$page.form?.supabaseErrorMessage}
		</p>
	</div>
{/if}

<form {action} method="POST" autocomplete="off" use:enhance>
	<label>
		<span>Name</span>
		<input placeholder="Event name" required type="text" name="name" value={name} />
	</label>

	<label style:grid-row="span 2">
		<span>Description</span>
		<textarea placeholder="Event description" required type="text" name="description"
			>{description}</textarea
		>
	</label>

	<label>
		<span>Max attendees</span>
		<input
			required
			placeholder="0 - 1000000"
			type="number"
			style="appearance: textfield;"
			min="1"
			max="1000000"
			name="maxPax"
			oninput="this.value = this.value.replace(/^[^1-9]/,'')"
			value={maxPax}
		/>
	</label>

	<label>
		<span>Start time</span>
		<input
			required
			type="datetime-local"
			name="startTime"
			bind:value={startTime}
			min={isEdit ? null : currentTime}
		/>
	</label>

	<label>
		<span>End time</span>
		<input required type="datetime-local" name="endTime" value={endTime} min={startTime} />
	</label>

	<label>
		<span>Publish</span>
		<input required type="datetime-local" name="publishTime" value={publishTime} max={startTime} />
	</label>

	<label>
		<span>Rsvp before</span>
		<input required type="datetime-local" name="rsvpTime" value={rsvpTime} max={startTime} />
	</label>

	<input type="hidden" name="tz" value={new Date().getTimezoneOffset()} />

	<button type="submit">{isEdit ? 'Save' : 'Create event!'}</button>
</form>

<style>
	form {
		display: grid;
		gap: 2rem;
		grid-template-columns: repeat(auto-fit, max(calc(50% - 1rem), 24ch));
		width: 100%;
		justify-content: center;

		margin: 1rem 0;
	}

	input:invalid:not(:placeholder-shown) {
		background-color: var(--err-bg);
		color: var(--err-text);
	}

	button {
		margin-top: 1rem;
		grid-column: 1/-1;
	}

	label {
		display: flex;
		flex-direction: column;
		font-weight: bold;
		color: var(--color-b);
		gap: 0.5rem;
	}

	label:focus-within {
		color: var(--color-d);
	}

	textarea {
		resize: none;
		height: 100%;
	}

	.errorbois {
		padding: 1rem;
		margin: 1rem 0;
		background-color: var(--err-bg);
		color: var(--err-text);
	}
</style>
