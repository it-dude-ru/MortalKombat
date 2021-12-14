const $arenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');

function changeHP(damage) {
	if (this.hp < damage) {
		this.hp = 0;
	} else {
		this.hp -= damage;
	}
}

function elHP() {
	return document.querySelector('.player' + this.player + ' .life');
}

function renderHP() {
	this.elHP().style.width = this.hp + '%';
}

const player1 = {
	player: 1,
	name: 'Sub-Zero',
	hp: 100,
	img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
	weapon: ['Ледяной скипетр', 'Ледяной меч'],
	changeHP: changeHP,
	elHP: elHP,
	renderHP: renderHP,
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
	changeHP: changeHP,
	elHP: elHP,
	renderHP: renderHP,
	attack: function() {
		console.log(player2.name + 'Fight...');
	}
}



function createElement(tag, className) {
	const $tag = document.createElement(tag);
	if (className) {
		$tag.classList.add(className);
	}
	return $tag;
}

function createPlayer(playerObj) {
	const $player = createElement('div', 'player' + playerObj.player);
	const $progressbar = createElement('div', 'progressbar');
	const $character = createElement('div', 'character');
	const $life = createElement('div', 'life');
	$life.style.width = playerObj.hp + '%';

	const $name = createElement('div', 'name');
	$name.innerText = playerObj.name;
	
	const $img = createElement('img');
	$img.src = playerObj.img;
	
	$player.appendChild($progressbar);
	$player.appendChild($character);
	$progressbar.appendChild($life);
	$progressbar.appendChild($name);
	$character.appendChild($img);
	
	return $player;
}

function playerWins(name) {
	const $loseTitle = createElement('div', 'loseTitle');
	if (name) {
		$loseTitle.innerText = name + ' win!';
	} else {
		$loseTitle.innerText = 'Death Heat';
	}
	
	return $loseTitle;
}

function getRandom(range) {
	return Math.ceil(Math.random() * range);
}

function createReloadButton() {
	const $reloadWrap = createElement('div', 'reloadWrap');
	const $button = createElement('button', 'button');
	$button.innerText = 'Restart';
	$reloadWrap.appendChild($button);
	return $reloadWrap;
}

const $reloadButton = createReloadButton();
$reloadButton.addEventListener('click', function() {
	window.location.reload()
});

$randomButton.addEventListener('click', function() {
	player1.changeHP(getRandom(20));
	player1.renderHP();
	player2.changeHP(getRandom(20));
	player2.renderHP();
	
	if (player1.hp === 0 || player2.hp === 0) {
		$randomButton.disabled = true;
		$arenas.appendChild($reloadButton);
	}
	if (player1.hp === 0 && player1.hp < player2.hp) {
		$arenas.appendChild(playerWins(player2.name));
	} else if (player2.hp === 0 && player2.hp < player1.hp) {
		$arenas.appendChild(playerWins(player1.name));
	} else if (player2.hp === 0 && player1.hp === 0) {
		$arenas.appendChild(playerWins());
	}
});

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));
