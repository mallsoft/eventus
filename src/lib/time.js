/**
 * Make it so the datetime-local supports timezone offsets.
 * @param {*} timeString datetime-local style time
 * @param {*} timeOffset the intended timezone
 * @returns {string}  "timestampz" that becomes utc'ish
 */
export function tz(timeString, timeOffset) {
	const d = new Date(timeString);
	d.setMinutes(d.getMinutes() + timeOffset);

	return dateTimeFormat(d);
}

/**
 * Create a string formatted to support the "datetime-local" input initial values
 * @param {*} d date..
 * @returns {string} `${year}-${month}-${day}T${hour}:${minute}`
 */
export const dateTimeFormat = (d) => {
	//why isn't this a part of the datetime-local thing??? YYYY-MM-DDTHH:MM
	const year = d.getFullYear();
	const month = String(d.getMonth() + 1).padStart(2, '0'); // Month is 0-based, so add 1 and pad with '0' if needed
	const day = String(d.getDate()).padStart(2, '0');
	const hour = String(d.getHours()).padStart(2, '0');
	const minute = String(d.getMinutes()).padStart(2, '0');
	return `${year}-${month}-${day}T${hour}:${minute}`;
};
