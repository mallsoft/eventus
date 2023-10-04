import { fail, redirect } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
	logout: async ({ locals: { supabase } }) => {
		const { error } = await supabase.auth.signOut();

		if (error) {
			console.log(error);
			return fail(500, { message: 'Server error. Try again later.' });
		}

		throw redirect(303, '/');
	},
	loginGithub: async ({ request, locals: { supabase } }) => {
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
	loginMagicLink: async ({ request, locals: { supabase } }) => {
		const email = (await request.formData()).get('email');

		if (!email) {
			return fail(400, { message: 'Email missing.' });
		}

		const { origin } = new URL(request.url);

		const { error } = await supabase.auth.signInWithOtp({
			email,
			options: {
				emailRedirectTo: origin
			}
		});
		// ...
		if (error) {
			console.log(error);
			return fail(500, { message: 'Server error. Try again later.' });
		}

		return { linkSent: true };
	}
};
