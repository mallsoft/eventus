import { error } from '@sveltejs/kit';
import QRCode from 'qrcode';

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ locals: { supabase }, params: { event_id }, url }) => {
	let ticket; // if user has one that is...

	console.log('Get ticket ref!');
	// url is ...ticket uid + some stuf.. (users can see their own row in the rsvp thing)
	const res = await supabase.from('rsvps').select('reference, meta').eq('event_id', event_id);
	if (!res.error) {
		const entry = res?.data[0];
		const reference = entry?.reference;
		if (reference) {
			const path = `${url.origin}/${event_id}/${reference}`; // create ticket check path

			const qr = await new Promise((resolve, reject) => {
				QRCode.toString(path, { type: 'svg' }, (err, result) => {
					err ? reject(err) : resolve(result);
				});
			});

			console.log('TICKET:', path);
			// ticket🤠
			ticket = { qr, path, reference, meta: entry.meta };
		} else {
			throw error(404, 'No reference found');
		}
	} else {
		throw error(500, res.err);
	}

	return { ticket };
};
