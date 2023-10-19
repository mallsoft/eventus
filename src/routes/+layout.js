import { env } from '$env/dynamic/public';
import { createSupabaseLoadClient } from '@supabase/auth-helpers-sveltekit';
import { error } from '@sveltejs/kit';

export const load = async ({ fetch, data, depends }) => {
	depends('supabase:auth');

	const supabase = createSupabaseLoadClient({
		supabaseUrl: env.PUBLIC_SUPABASE_URL,
		supabaseKey: env.PUBLIC_SUPABASE_ANON_KEY,
		event: { fetch },
		serverSession: data.session
	});

	const { data: event_admin, error: err } = await supabase.from('event_admin').select('id');

	if (err) {
		throw error(500, err);
	}

	const {
		data: { session }
	} = await supabase.auth.getSession();

	return { supabase, session, event_admin: !!event_admin.length };
};
