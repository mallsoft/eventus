import { error } from '@sveltejs/kit';
import QRCode from 'qrcode';

/** @type {import('./$types').PageLoad} */
export const load = async ({ locals: { supabase }, params: { event_id, ticket_ref } }) => {
	let { data, error: err } = await supabase.rpc('check_ticket_w_meta', {
		ticket_event_id: event_id,
		ticket_ref
	});

	if (err) {
		console.log(err);
		throw error(500, err);
	}

	console.log(data);

	return { ticketInfo: data };
};
