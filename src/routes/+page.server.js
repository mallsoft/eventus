import { error, fail, redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export const load = async ({ locals: { supabase } }) => {
	let { data: events, error: err } = await supabase
		.from('events')
		.select('*, attending:rsvps(*)')
		.order('start_time', { ascending: false });

	if (err) {
		throw error(500, err);
	}

	return { events };
};

/** @type {import('./$types').Actions} */
export const actions = {
	eventDelete: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const event_id = formData.get('eventId');
		console.log('DELETE EVENT', event_id);

		const { error } = await supabase.from('events').delete().eq('id', event_id);

		if (error) {
			console.error(error);
			return fail(500, { message: 'Server error. Try again later.' });
		}

		return { success: true };
	},
	eventRegister: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const event_id = formData.get('eventId');
		console.log('REGISTER => event id:' + event_id);

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
		console.log('UNREGISTER => event id:' + event_id);

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
	}
};
