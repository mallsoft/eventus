import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export const load = async () => {
	throw error(404, 'Not Found');
};
