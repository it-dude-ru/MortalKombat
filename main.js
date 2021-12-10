const player1 = {
	name: 'Sub-Zero',
	hp: 100,
	img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
	weapon: ['Ледяной скипетр', 'Ледяной меч'],
	attack: function() {
		console.log(player1.name + ' Fight...');
	}
}

const player2 = {
	name: 'Liu Kang',
	hp: 80,
	img: 'http://reactmarathon-api.herokuapp.com/assets/liukang.gif',
	weapon: ['Меч Дракона', 'Нунчаки'],
	attack: function() {
		console.log(player2.name + 'Fight...');
	}
}


function createPlayer(playerClass, player) {
	const $player = document.createElement('div');
	$player.classList.add(playerClass);
	
	const $progressbar = document.createElement('div');
	$progressbar.classList.add('progressbar');
	
	const $character = document.createElement('div');
	$character.classList.add('character');

	const $life = document.createElement('div');
	$life.classList.add('life');
	$life.style.width = player.hp + '%';

	const $name = document.createElement('div');
	$name.classList.add('name');
	$name.innerText = player.name;
	
	const $img = document.createElement('img');
	$img.src = player.img;
	
	$parent = document.querySelector('.arenas');
	$parent.appendChild($player);
	$player.appendChild($progressbar);
	$player.appendChild($character);
	$progressbar.appendChild($life);
	$progressbar.appendChild($name);
	$character.appendChild($img);
}

createPlayer ('player1', player1);
createPlayer ('player2', player2);

player1.attack();
player2.attack();
