import { validateEvent } from '$lib/validate';
import { error, fail, redirect } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
	login: async ({ request, locals: { supabase } }) => {
		const { origin } = new URL(request.url);
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: 'github',
			options: {
				redirectTo: origin
			}
		});

		if (error) {
			return fail(500, { message: 'Server error. Try again later.', success: false });
		}

		throw redirect(303, data.url);
	},
	logout: async ({ request, locals: { supabase } }) => {
		const { error } = await supabase.auth.signOut();

		if (error) {
			return fail(500, { message: 'Server error. Try again later.', success: false });
		}

		const { origin } = new URL(request.url);

		throw redirect(303, origin);
	},
	createEvent: async ({ request, locals: { supabase, getSession } }) => {
		const session = await getSession();

		if (!session) {
			// the user is not signed in
			throw error(401, { message: 'Unauthorized' });
		}

		const formData = await request.formData();

		const new_event = {
			name: formData.get('eventName'),
			description: formData.get('eventDescription'),
			start_time: formData.get('eventStartTime'),
			end_time: formData.get('eventEndTime'),
			max_pax: formData.get('eventMaxPax')
		};

		const fails = validateEvent(new_event);

		if (fails.length) {
			return fail(400, { validationErrors: fails });
		}

		const { error: err, data: event } = await supabase.from('events').insert([new_event]).select();

		if (err) {
			return fail(500, {
				supabaseErrorMessage: err.message
			});
		}

		return {
			event
		};
	}
};

/** @type {import('./$types').PageLoad} */
export const load = async ({ locals: { supabase } }) => {
	let { data: events, error: err } = await supabase.from('events').select('*');

	if (err) {
		throw error(500, err);
	}

	return { events };
};
