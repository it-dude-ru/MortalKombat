
export default function time() {
	const date = new Date();
	const normalize = (num) => (num.toString().length > 1 ? num : `0${num}`);
	return `${normalize(date.getHours())}:${normalize(date.getMinutes())}:${normalize(date.getSeconds())}`;
}
