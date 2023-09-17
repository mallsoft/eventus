import { createSupabaseLoadClient } from '@supabase/auth-helpers-sveltekit';
import { error } from '@sveltejs/kit';

export const load = async ({ fetch, data, depends }) => {
	depends('supabase:auth');

	const supabase = createSupabaseLoadClient({
		supabaseUrl: import.meta.env.VITE_SUPABASE_URL,
		supabaseKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
		event: { fetch },
		serverSession: data.session
	});

	const {
		data: { session }
	} = await supabase.auth.getSession();

	const { data: event_admin, error: err } = await supabase.from('event_admin').select('id');
	if (err) {
		throw error(500, err);
	}

	return { supabase, session, event_admin: !!event_admin.length };
};
