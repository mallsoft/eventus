import { validateEvent } from '$lib/server/validate';
import { error, fail, redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export const load = async ({ locals: { getSession } }) => {
	const session = await getSession();
	if (!session?.user?.user_metadata?.user_name) {
		throw redirect(303, '/');
	}
};

/** @type {import('./$types').Actions} */
export const actions = {
	createEvent: async ({ request, locals: { supabase, getSession } }) => {
		const session = await getSession();

		if (!session) {
			// the user is not signed in
			throw error(401, { message: 'Unauthorized' });
		}

		const formData = await request.formData();

		const new_event = {
			description: formData.get('description'),
			end_time: formData.get('endTime'),
			max_pax: formData.get('maxPax'),
			name: formData.get('name'),
			publish_on: formData.get('publishTime'),
			rsvp_before: formData.get('rsvpTime'),
			start_time: formData.get('startTime')
		};

		const fails = validateEvent(new_event);

		if (fails.length) {
			console.log('fails', fails);
			return fail(400, { validationErrors: fails });
		}

		const { error: err } = await supabase.from('events').insert([new_event]).select();

		if (err) {
			console.log('err', err);

			return fail(500, {
				supabaseErrorMessage: err.message
			});
		}

		throw redirect(303, '/');
	}
};
