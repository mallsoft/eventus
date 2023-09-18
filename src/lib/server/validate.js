export function validateEvent({
	name,
	// description,
	start_time,
	end_time,
	max_pax,
	rsvp_before,
	publish_on
}) {
	let fails = [];

	const start = new Date(start_time).getTime();
	const end = new Date(end_time).getTime();
	const rsvp = new Date(rsvp_before).getTime();
	const publish = new Date(publish_on).getTime();

	try {
		if (!name) {
			fails.push('Not valid name');
		}

		if (!max_pax || isNaN(parseInt(max_pax)) || parseInt(max_pax) < 1) {
			fails.push('Attendees needs to be greater than 0');
		}

		if (start && end) {
			if (start > end) fails.push('start time after end time');
		} else {
			if (!start) fails.push(`start time invalid ${start_time}`);
			if (!end) fails.push('end time invalid');
		}

		if (!rsvp) {
			fails.push('rsvp time invalid');
		} else if (start && rsvp > start) {
			fails.push('rsvp time is after start time');
		}

		if (!publish) {
			fails.push('publish time invalid');
		} else if (start && publish < start) {
			fails.push('publish time is after start time');
		}

		//
	} catch {
		fails.push('Error validating event');
	}

	return fails;
}
