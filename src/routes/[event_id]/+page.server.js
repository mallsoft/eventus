import { validatePersonalDeets } from '$lib/server/validate';
import { fail, redirect, error } from '@sveltejs/kit';
import QRCode from 'qrcode';

/** @type {import('./$types').PageLoad} */
export const load = async ({ locals: { supabase }, params: { event_id }, url }) => {
	if (/[^0-9]/.test(event_id)) {
		throw error(404, 'Not Found');
	}

	let { data: event, error: err } = await supabase
		.from('events')
		.select('*, attending:rsvps(*)')
		.eq('id', event_id)
		.order('start_time', { ascending: false });
	if (err) {
		throw error(500, err);
	}

	if (!event.length) {
		throw error(404, 'Not Found');
	}

	const attending = event[0].attending?.length > 0;
	let ticket; // if user has one that is...

	if (attending) {
		console.log('such attending!');
		// person is registered ... so make a ticket...

		// url is ...ticket uid + some stuf.. (users can see their own row in the rsvp thing)
		const res = await supabase.from('rsvps').select('reference').eq('event_id', event_id);
		if (!res.error) {
			const reference = res?.data[0]?.reference;
			if (reference) {
				// use ref to create checkpath
				const path = `${url.origin}/event-admin/${event_id}/${reference}`;
				const qr = await new Promise((resolve, reject) => {
					QRCode.toString(path, { type: 'svg' }, (err, result) => {
						err ? reject(err) : resolve(result);
					});
				});

				// console.log('TICKET:', path);
				// ticket🤠
				ticket = { qr, path };
			}
		}
	}

	return { event: event[0], ticket };
};

/** @type {import('./$types').Actions} */
export const actions = {
	eventRegister: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const event_id = formData.get('eventId');

		// scope creep
		const name = formData.get('name');
		const phone = formData.get('phone');
		const org = formData.get('org');

		// scope creep
		const meta = { name, phone, org };
		const fails = validatePersonalDeets(meta);
		if (fails.length) {
			return fail(400, { validationErrors: fails });
		}
		// ---

		const { error } = await supabase.rpc('register_to_event_meta', {
			event_id,
			meta
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
