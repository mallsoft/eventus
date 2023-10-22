import { fail, redirect } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
	eventRegister: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const event_id = formData.get('eventId');

		const { error } = await supabase.rpc('register_to_event', {
			event_id
		});

		if (error) {
			console.error(error);
			return fail(500, { message: 'Server error. Try again later.' });
		}

		return { success: true };
	},
	eventUnregister: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const event_id = formData.get('eventId');

		const { error } = await supabase.rpc('unregister_from_event', { event_id });

		if (error) {
			console.error(error);
			return fail(500, { message: 'Server error. Try again later.' });
		}

		return { success: true };
	},
	// ---------- auth ----------
	login: async ({ request, locals: { supabase } }) => {
		const { origin } = new URL(request.url);
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: 'github',
			options: {
				redirectTo: origin
			}
		});

		if (error) {
			console.log(error);
			return fail(500, { message: 'Server error. Try again later.' });
		}

		throw redirect(303, data.url);
	},
	logout: async ({ request, locals: { supabase } }) => {
		const { error } = await supabase.auth.signOut();

		if (error) {
			console.log(error);
			return fail(500, { message: 'Server error. Try again later.' });
		}

		const { origin } = new URL(request.url);

		throw redirect(303, origin);
	},
	loginMagic: async ({ request, locals: { supabase } }) => {
		const { origin } = new URL(request.url);

		const formData = await request.formData();
		const email = formData.get('email');

		const { data, error } = await supabase.auth.signInWithOtp({
			email: email,
			options: {
				redirectTo: origin
			}
		});

		if (error) {
			console.log(error);
			return fail(500, { message: 'Server error. Try again later.' });
		}

		throw redirect(303, data.url);
	}
};