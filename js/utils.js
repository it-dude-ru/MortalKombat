export const getRandom = (range) => Math.ceil(Math.random() * range);

export function time() {
	const date = new Date();
	const normalize = (num) => (num.toString().length > 1 ? num : `0${num}`);
	return `${normalize(date.getHours())}:${normalize(date.getMinutes())}:${normalize(date.getSeconds())}`;
}

export function createElement(tag, className) {
	const $tag = document.createElement(tag);
	if (className) {
		$tag.classList.add(className);
	}
	return $tag;
}