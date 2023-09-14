export function validateEvent({ name, description, start_time, end_time, max_pax }) {
	let fails = [];

	try {
		if (!name) {
			fails.push('Not valid name');
		}

		if (!description) {
			//... desc isnt required?
		}

		if (!start_time || !end_time) {
			fails.push('Event time error');
		} else if (new Date(start_time).getTime() >= new Date(end_time).getTime()) {
			fails.push('Start and end time are incorrect');
		}

		if (!max_pax || isNaN(parseInt(max_pax)) || parseInt(max_pax) < 1) {
			fails.push('Attendees needs to be greater than 0');
		}
	} catch {
		fails.push('Error validating event');
	}

	return fails;
}
