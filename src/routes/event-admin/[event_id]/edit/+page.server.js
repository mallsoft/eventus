import { tz } from '$lib/time';
import { validateEvent } from '$lib/server/validate';
import { fail, redirect } from '@sveltejs/kit';

/** @type {import('../$types').Actions} */
export const actions = {
	editEvent: async ({ request, locals: { supabase }, params: { event_id } }) => {
		const formData = await request.formData();

		let editEvent = {
			description: formData.get('description'),
			max_pax: formData.get('maxPax'),
			name: formData.get('name'),
			publish_on: formData.get('publishTime'),
			rsvp_before: formData.get('rsvpTime'),
			start_time: formData.get('startTime'),
			end_time: formData.get('endTime')
		};

		const fails = validateEvent(editEvent);

		if (fails.length) {
			console.log('fails', fails);
			return fail(400, { validationErrors: fails });
		}

		const offset = +formData.get('tz');

		editEvent = {
			...editEvent,
			publish_on: tz(editEvent.publish_on, offset),
			rsvp_before: tz(editEvent.rsvp_before, offset),
			start_time: tz(editEvent.start_time, offset),
			end_time: tz(editEvent.end_time, offset)
		};

		const { error: err } = await supabase.from('events').update([editEvent]).eq('id', event_id);

		if (err) {
			console.log('err', err);

			return fail(500, {
				supabaseErrorMessage: err.message
			});
		}

		throw redirect(303, '/' + event_id);
	},
	eventDelete: async ({ locals: { supabase }, params: { event_id } }) => {
		console.log('DELETE EVENT', event_id);

		const { error } = await supabase.from('events').delete().eq('id', event_id);

		if (error) {
			console.error(error);
			return fail(500, { message: 'Server error. Try again later.' });
		}

		throw redirect(303, '/event-admin');
	},
	imageUpload: async ({ request, locals: { supabase }, params: { event_id } }) => {
		const form = await request.formData();
		const image = form.get('image');

		if (!image || image.length === 0) {
			return fail(400, { imageError: 'No image in request.' });
		}

		const type = image.type.split('/')[1] ? `.${image.type.split('/')[1]}` : '';
		const pathName = `ev${event_id}${type}`;

		console.log('UPLOADING IMAGE', pathName, event_id, image.type);

		const { data, error } = await supabase.storage.from('event').upload(pathName, image, {
			upsert: true
		});

		if (error) {
			console.error(error);
			return fail(500, { imageError: error.message });
		}

		const { path } = data;
		const eventImage = await supabase.storage.from('event').getPublicUrl(path);
		console.log(eventImage);
		return { eventImage };
	}
};
