export const eventTime = (
	{ start_time, end_time, rsvp_before },
	opts = {
		year: '2-digit',
		month: 'numeric',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric'
	},
	locale = undefined
) => {
	const dt = new Intl.DateTimeFormat(locale, opts);

	const _NOW = new Date();

	const _start = new Date(start_time);
	const _end = new Date(end_time);
	const _rsvp = new Date(rsvp_before);

	const startEndRange = dt.formatRange(_start, _end);

	const rsvpTime = dt.format(_rsvp);

	const isAfterRsvp = _NOW.getTime() >= _rsvp.getTime();

	return {
		isAfterRsvp,
		startEndRange,
		rsvpTime
	};
};
