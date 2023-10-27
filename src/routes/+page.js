import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export const load = async ({ parent }) => {
	const { supabase } = await parent();

	let { data: events, error: err } = await supabase
		.from('events')
		.select('*, attending:rsvps(*)')
		// .lt('publish_on', 'now()') // publish date less than current time
		// ^ This shouldn't be needed... i think
		.gt('end_time', 'now()') // end date less than now
		.order('start_time', { ascending: true });

	if (err) {
		throw error(500, err);
	}

	return { events: events.filter((e) => e.attending.length > 0) };
};
