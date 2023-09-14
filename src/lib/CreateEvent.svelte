<form action="?/createEvent" method="POST">
	<label>
		<span>Name</span>
		<input type="text" name="eventName" />
	</label>

	<label>
		<span>Description</span>
		<input type="text" name="eventDescription" />
	</label>

	<label>
		<span>Rsvp before</span>
		<input
			type="datetime-local"
			name="eventEndTime"
			value={new Date().toLocaleString()}
			min={new Date().toLocaleString()}
		/>
	</label>

	<label>
		<span>Start time</span>
		<input
			type="datetime-local"
			name="eventStartTime"
			value={new Date().toLocaleString()}
			min={new Date().toLocaleString()}
		/>
	</label>

	<label>
		<span>End time</span>
		<input
			type="datetime-local"
			name="eventEndTime"
			value={new Date().toLocaleString()}
			min={new Date().toLocaleString()}
		/>
	</label>

	<label>
		<span>Max attendees</span>
		<input type="number" name="eventMaxPax" min="1" max="99_000_000" />
	</label>

	<button type="submit">Create event!</button>
</form>

<style>
	form {
		display: flex;
		flex-direction: column;
		gap: 1rem;

		max-width: max-content;
	}
</style>
