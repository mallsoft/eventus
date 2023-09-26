import { tz } from '$lib/time';
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

		let new_event = {
			description: formData.get('description'),
			max_pax: formData.get('maxPax'),
			name: formData.get('name'),
			publish_on: formData.get('publishTime'),
			rsvp_before: formData.get('rsvpTime'),
			start_time: formData.get('startTime'),
			end_time: formData.get('endTime')
		};

		const fails = validateEvent(new_event);

		if (fails.length) {
			console.log('fails', fails);
			return fail(400, { validationErrors: fails });
		}

		console.log(new_event);
		// const offset = formData.get('tz');
		// new_event = {
		// 	...new_event,
		// 	publish_on: tz(new_event.publish_on, offset),
		// 	rsvp_before: tz(new_event.rsvp_before, offset),
		// 	start_time: tz(new_event.start_time, offset),
		// 	end_time: tz(new_event.end_time, offset)
		// };

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
