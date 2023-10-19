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
	}
	// loginMagicLink: async ({ request, locals: { supabase } }) => {
	// 	const email = (await request.formData()).get('email');

	// 	if (!email) {
	// 		return fail(400, { message: 'Email missing.' });
	// 	}

	// 	const { origin } = new URL(request.url);

	// 	const { error } = await supabase.auth.signInWithOtp({
	// 		email,
	// 		options: {
	// 			emailRedirectTo: origin
	// 		}
	// 	});
	// 	// ...
	// 	if (error) {
	// 		console.log(error);
	// 		return fail(500, { message: 'Server error. Try again later.' });
	// 	}

	// 	return { linkSent: true, email };
	// },
	// verifyOTP: async ({ request, locals: { supabase } }) => {
	// 	const data = await request.formData();
	// 	const token = data.get('otp');
	// 	const email = data.get('email');

	// 	console.log(token, email);
	// 	if (token) {
	// 		const { error } = await supabase.auth.verifyOtp({ email, token, type: 'email' });
	// 		if (!error) {
	// 			throw redirect(303, '/');
	// 		}
	// 	}

	// 	// return the user to an error page with some instructions
	// 	throw redirect(303, '/account/confirm/error');
	// }
};
