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
			return fail(500, { message: 'Server error. Try again later.' });
		}

		throw redirect(303, data.url);
	},
	logout: async ({ request, locals: { supabase } }) => {
		const { error } = await supabase.auth.signOut();

		if (error) {
			return fail(500, { message: 'Server error. Try again later.' });
		}

		const { origin } = new URL(request.url);

		throw redirect(303, origin);
	}
};

/** @type {import('./$types').PageLoad} */
export const load = async ({ locals: { supabase } }) => {
	let { data: events, error: err } = await supabase.from('events').select('*, attendees(id) ');

	if (err) {
		throw error(500, err);
	}

	return { events };
};
