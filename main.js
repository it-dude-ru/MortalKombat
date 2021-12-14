const $arenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');

const player1 = {
	player: 1,
	name: 'Sub-Zero',
	hp: 100,
	img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
	weapon: ['Ледяной скипетр', 'Ледяной меч'],
	attack: function() {
		console.log(player1.name + ' Fight...');
	}
}

const player2 = {
	player: 2,
	name: 'Liu Kang',
	hp: 100,
	img: 'http://reactmarathon-api.herokuapp.com/assets/liukang.gif',
	weapon: ['Меч Дракона', 'Нунчаки'],
	attack: function() {
		console.log(player2.name + 'Fight...');
	}
}

function createElement (tag, className) {
	const $tag = document.createElement(tag);
	if (className) {
		$tag.classList.add(className);
	}
	return $tag;
}

function createPlayer(player) {
	const $player = createElement('div', 'player' + player.player);
	
	const $progressbar = createElement('div', 'progressbar');
	
	const $character = createElement('div', 'character');

	const $life = createElement('div', 'life');
	$life.style.width = player.hp + '%';

	const $name = createElement('div', 'name');
	$name.innerText = player.name;
	
	const $img = createElement('img');
	$img.src = player.img;
	
	$player.appendChild($progressbar);
	$player.appendChild($character);
	$progressbar.appendChild($life);
	$progressbar.appendChild($name);
	$character.appendChild($img);
	
	return $player;
}

function changeHP(player) {
	const $playerLife = document.querySelector('.player' + player.player + ' .life');
	player.hp -= Math.ceil(Math.random() * 20);
	$playerLife.style.width = player.hp < 0 ? '0%' : player.hp + '%';
	if (player.hp < 0) {
		const name = player.player === 1 ? player2.name : player1.name;
		$arenas.appendChild(playerWin(name));
		$randomButton.disabled = true
	}
}

function playerWin(name) {
	const $loseTitle = createElement('div', 'loseTitle');
	$loseTitle.innerText = name + ' win!';
	
	return $loseTitle;
}

$randomButton.addEventListener('click', function() {
	changeHP(player1);
	changeHP(player2);
});

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));
