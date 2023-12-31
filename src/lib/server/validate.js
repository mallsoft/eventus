import { validOrgs } from '$lib/validOrgs';

export function validateEvent({
	name,
	description,
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
		if (!name || name.length >= 100) {
			fails.push('Not valid name');
		}

		if (description && description.length >= 2000) {
			fails.push('Description too long');
		}

		if (!max_pax || isNaN(parseInt(max_pax)) || parseInt(max_pax) < 1) {
			fails.push('Attendees needs to be greater than 0');
		}
		if (parseInt(max_pax) > 9_000_000) {
			fails.push('how many people???');
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
		} else if (start && publish > start) {
			fails.push('publish time is after start time');
		}

		//
	} catch {
		fails.push('Error validating event');
	}

	return fails;
}
export function validatePersonalDeets(deets) {
	let fails = [];

	const { name, phone, org } = deets;

	if (!name || !phone || !org) {
		fails.push('Missing fields!');
		return fails;
	}

	if (name.length < 1) {
		fails.push('Name too short');
	}

	if (phone.length < 8 || phone.length > 12) {
		fails.push('Phonenumber invalid length');
	}

	if (!validOrgs.includes(org)) {
		fails.push('Organization is invalid');
	}

	return fails;
}
