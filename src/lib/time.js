/*

incoming 
  publish_on: '2023-09-26T23:07', 
  rsvp_before: '2023-09-26T23:07',
  start_time: '2023-09-26T23:07', 
  end_time: '2023-09-26T23:07' 

	...
	shift x minutes... to utc...

*/

export function tz(timeString, timeOffset) {
	const date = new Date(timeString);
	const offsetHours = Math.floor(timeOffset / 60);
	const offsetMinutes = timeOffset % 60;

	// Get the UTC time with the offset applied
	date.setUTCHours(date.getUTCHours() - offsetHours);
	date.setUTCMinutes(date.getUTCMinutes() - offsetMinutes);

	const timestampz = date
		.toISOString()
		.replace(
			'Z',
			`+${offsetHours.toString().padStart(2, '0')}:${offsetMinutes.toString().padStart(2, '0')}`
		);

	return timestampz;
}

export const dateTimeFormat = (d) => {
	//why isn't this a part of the datetime-local thing??? YYYY-MM-DDTHH:MM
	const year = d.getFullYear();
	const month = String(d.getMonth() + 1).padStart(2, '0'); // Month is 0-based, so add 1 and pad with '0' if needed
	const day = String(d.getDate()).padStart(2, '0');
	const hour = String(d.getHours()).padStart(2, '0');
	const minute = String(d.getMinutes()).padStart(2, '0');
	return `${year}-${month}-${day}T${hour}:${minute}`;
};
