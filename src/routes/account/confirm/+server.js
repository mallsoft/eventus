import { redirect } from '@sveltejs/kit';

export const GET = async ({ request, locals: { supabase } }) => {
	const data = await request.formData();
	const token = data.get('otp');
	const email = data.get('email');

	if (token) {
		const { error } = await supabase.auth.verifyOtp({ email, token, type: 'email' });
		if (!error) {
			throw redirect(303, '/');
		}
	}

	// return the user to an error page with some instructions
	throw redirect(303, '/account/confirm/error');
};
