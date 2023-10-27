import { error, fail } from '@sveltejs/kit';

/** @type {import('$types').PageServerLoad} */
export const load = async ({ locals: { supabase }, params: { event_id, ticket_ref } }) => {
	// check ticket
	const { data: ticketInfo, error: ticketErr } = await supabase.rpc('check_ticket_w_meta', {
		ticket_event_id: event_id,
		ticket_ref
	});

	if (ticketErr) {
		console.log(ticketErr);
		throw error(500, ticketErr);
	}

	// check attencance
	const { data: attendance, error: err2 } = await supabase
		.from('attended')
		.select('*')
		.eq('ticket_reference', ticket_ref);

	// [
	// 	{
	// 		created_at: '2023-10-27T22:44:02.122531+00:00',
	// 		ticket_reference: 'e3a5dfe2-a891-4374-8ed7-9716bbf9d5e9'
	// 	}
	// ]

	return { ticketInfo, registered: attendance?.length > 0 };
};

/** @type {import('./$types').Actions} */
export const actions = {
	registerAttendance: async ({ locals: { supabase }, params: { ticket_ref } }) => {
		//

		const { data, error } = await supabase
			.from('attended')
			.insert([{ ticket_reference: ticket_ref }])
			.select();

		if (error) {
			console.error('error registering attendance: ', error);
			return fail(500, { message: error.message });
		}

		return { success: true };
	},
	removeAttendance: async ({ locals: { supabase }, params: { ticket_ref } }) => {
		const { error } = await supabase.from('attended').delete().eq('ticket_reference', ticket_ref);

		if (error) {
			console.error('error removing attendance: ', error);
			return fail(500, { message: error.message });
		}

		return { success: true };
	}
};
