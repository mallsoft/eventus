import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export const load = async ({ parent }) => {
	const { supabase } = await parent();

	let { data: events, error: err } = await supabase
		.from('events')
		.select('*, attending:rsvps(*)')
		// .lt('end_time', "now() - interval '1 day'") // end date less than current time
		.lt('publish_on', 'now()') // end date less than current time
		.order('start_time', { ascending: true });

	if (err) {
		throw error(500, err);
	}

	return { events: events.filter((e) => e.attending.length > 0) };
};
