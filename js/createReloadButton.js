import { $arenas } from './getElements.js';
import createElement from './createElement.js';

export function createReloadButton() {
	const $reloadWrap = createElement('div', 'reloadWrap');
	const $button = createElement('button', 'button');
	$button.innerText = 'Restart';

	$reloadWrap.addEventListener('click', function () {
		window.location.reload();
	});

	$reloadWrap.appendChild($button);
	$arenas.appendChild($reloadWrap);
}
