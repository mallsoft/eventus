import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export const load = async ({ parent, params: { edit_id } }) => {
	const { supabase } = await parent();

	let { data: event, error: err } = await supabase
		.from('events')
		.select('*, attending:rsvps(*)')
		.eq('id', edit_id)
		.order('start_time', { ascending: false });

	if (err) {
		throw error(500, err);
	}

	if (!event.length) {
		// no event found..?
		throw error(404, 'Not Found');
	}

	return { event_edit: event };
};
