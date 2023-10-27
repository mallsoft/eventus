import { error } from '@sveltejs/kit';

/** @type {import('$types').PageServerLoad} */
export const load = async ({ locals: { supabase }, params: { event_id, ticket_ref } }) => {
	// check ticket
	let { data, error: err } = await supabase.rpc('check_ticket_w_meta', {
		ticket_event_id: event_id,
		ticket_ref
	});

	if (err) {
		console.log(err);
		throw error(500, err);
	}

	return { ticketInfo: data };
};
