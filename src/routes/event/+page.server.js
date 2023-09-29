import { fail, redirect } from '@sveltejs/kit';

/** @type {import('./[edit_id]/$types').Actions} */
export const actions = {
	eventDelete: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const event_id = formData.get('eventId');
		console.log('DELETE EVENT', event_id);

		const { error } = await supabase.from('events').delete().eq('id', event_id);

		if (error) {
			console.error(error);
			return fail(500, { message: 'Server error. Try again later.' });
		}

		throw redirect(303, '/');
	}
};
