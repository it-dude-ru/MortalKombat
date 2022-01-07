import { $arenas } from './getElements.js';
import { createElement } from './utils.js';

export function createReloadButton() {
	const $reloadWrap = createElement('div', 'reloadWrap');
	const $button = createElement('button', 'button');
	$button.innerText = 'Restart';

	$reloadWrap.addEventListener('click', function () {
		window.location.pathname = 'index.html';
	});

	$reloadWrap.appendChild($button);
	$arenas.appendChild($reloadWrap);
}
