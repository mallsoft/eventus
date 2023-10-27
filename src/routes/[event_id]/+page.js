import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export const load = async ({ parent, params: { event_id } }) => {
	const { supabase } = await parent();
	if (/[^0-9]/.test(event_id)) {
		throw error(404, 'Not Found');
	}

	let { data: event, error: err } = await supabase
		.from('events')
		.select('*, attending:rsvps(*)')
		.eq('id', event_id)
		.order('start_time', { ascending: false });
	if (err) {
		throw error(500, err);
	}

	if (!event.length) {
		throw error(404, 'Not Found');
	}

	return { event: event[0] };
};
