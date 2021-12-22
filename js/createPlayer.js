import createElement from './createElement.js';

export default function createPlayer({ player, name, hp, img }) {
	const $player = createElement('div', 'player' + player);
	const $progressbar = createElement('div', 'progressbar');
	const $character = createElement('div', 'character');
	const $life = createElement('div', 'life');
	$life.style.width = hp + '%';

	const $name = createElement('div', 'name');
	$name.innerText = name;

	const $img = createElement('img');
	$img.src = img;

	$player.appendChild($progressbar);
	$player.appendChild($character);
	$progressbar.appendChild($life);
	$progressbar.appendChild($name);
	$character.appendChild($img);

	return $player;
}
