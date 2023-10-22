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
	const startEndRange = dt.formatRange(new Date(start_time), new Date(end_time));
	const rsvpTime = dt.format(new Date(rsvp_before));
	const isAfterRsvp = new Date().getTime() >= new Date(rsvp_before).getTime();

	return {
		isAfterRsvp,
		startEndRange,
		rsvpTime
	};
};
