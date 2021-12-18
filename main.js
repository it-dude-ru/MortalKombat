const $arenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');
const $formFight = document.querySelector('.control');

const HIT = {
    head: 30,
    body: 25,
    foot: 20,
}
const ATTACK = ['head', 'body', 'foot'];

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

function attack(me, he) {
	// me - объект с параметрами атаки this игрока,
	// he - объект с параметрами атаки противника
	// функция вычисляет результат полученной атаки
	if (me.defence != he.hit) {
		this.changeHP(he.value);
	}
}

const player1 = {
	player: 1,
	name: 'Sub-Zero',
	hp: 100,
	img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
	weapon: ['Ледяной скипетр', 'Ледяной меч'],
	changeHP,
	elHP,
	renderHP,
	attack
}

const player2 = {
	player: 2,
	name: 'Liu Kang',
	hp: 100,
	img: 'http://reactmarathon-api.herokuapp.com/assets/liukang.gif',
	weapon: ['Меч Дракона', 'Нунчаки'],
	changeHP,
	elHP,
	renderHP,
	attack
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
	
	$reloadWrap.addEventListener('click', function() {
		window.location.reload()
	});
	
	$reloadWrap.appendChild($button);
	$arenas.appendChild($reloadWrap);
}

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

function enemyAttack() {
	const hit = ATTACK[getRandom(3) - 1];
	const defence = ATTACK[getRandom(3) - 1];
	
	return {
		value: getRandom(HIT[hit]),
		hit,
		defence
	}
}

$formFight.addEventListener('submit', function(e) {
	e.preventDefault();
	const enemy = enemyAttack();
	const attack = {};
	
	for (let item of $formFight) {
		if (item.checked && item.name === 'hit') {
			attack.value = getRandom(HIT[item.value]);
			attack.hit = item.value;
		}
		
		if (item.checked && item.name === 'defence') {
			attack.defence = item.value;
		}
		item.checked = false;
	}
	
	player1.attack(attack, enemy);
	player1.renderHP();
	player2.attack(enemy, attack);
	player2.renderHP();

	if (player1.hp === 0 || player2.hp === 0) {
		$randomButton.disabled = true;
		createReloadButton();
	}
	if (player1.hp === 0 && player1.hp < player2.hp) {
		$arenas.appendChild(playerWins(player2.name));
	} else if (player2.hp === 0 && player2.hp < player1.hp) {
		$arenas.appendChild(playerWins(player1.name));
	} else if (player2.hp === 0 && player1.hp === 0) {
		$arenas.appendChild(playerWins());
	}
})
