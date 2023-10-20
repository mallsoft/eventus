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
		const formData = await request.formData();
		const backTo = formData.get('backTo');

		const { origin } = new URL(request.url);

		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: 'github',
			options: {
				redirectTo: backTo ?? origin
			}
		});

		if (error) {
			console.log(error);
			return fail(500, { message: 'Server error. Try again later.' });
		}

		if (data?.url) {
			throw redirect(303, data.url);
		}
	}
};
