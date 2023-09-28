import { error } from '@sveltejs/kit';

/** @type {import('./$types').LayoutServerLoad} */
export const load = async ({ parent, locals: { getSession } }) => {
	const { event_admin } = await parent();
	const session = await getSession();

	if (!session?.user?.user_metadata?.user_name && !event_admin) {
		throw error(404, 'Not Found');
	}
};
