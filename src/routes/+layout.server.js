export const load = async ({ locals: { getSession, supabase } }) => {
	return {
		session: await getSession()
	};
};
