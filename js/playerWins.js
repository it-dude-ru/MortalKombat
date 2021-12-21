import createElement from './createElement.js';

export function playerWins(name) {
	const $loseTitle = createElement('div', 'loseTitle');
	if (name) {
		$loseTitle.innerText = name + ' win!';
	} else {
		$loseTitle.innerText = 'Death Heat';
	}

	return $loseTitle;
}
