import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export const load = async ({ parent }) => {
	const { supabase } = await parent();

	let { data: events, error: err } = await supabase
		.from('events')
		.select('*, attending:rsvps(*)')
		.order('start_time', { ascending: false });
	// attending = [{some user obj}] else []
	// => is the requestee registered for this event

	if (err) {
		throw error(500, err);
	}

	return { events };
};
