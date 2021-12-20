const $arenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');
const $formFight = document.querySelector('.control');
const $chat = document.querySelector('.chat');

const logs = {
    start: 'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
    end: [
        'Результат удара [playerWins]: [playerLose] - труп',
        '[playerLose] погиб от удара бойца [playerWins]',
        'Результат боя: [playerLose] - жертва, [playerWins] - убийца',
    ],
    hit: [
        '[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.',
        '[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.',
        '[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.',
        '[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.',
        '[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.',
        '[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.',
        '[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.',
        '[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.',
        '[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.',
        '[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.',
        '[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.',
        '[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.',
        '[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.',
        '[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.',
        '[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',
        '[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.',
        '[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.',
        '[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.',
    ],
    defence: [
        '[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.',
        '[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.',
        '[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.',
        '[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.',
        '[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
        '[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.'
    ],
    draw: [
		'Ничья - это тоже победа!',
		'Главное не победа, а участие!'
	]
};

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

const player1 = {
	player: 1,
	name: 'Sub-Zero',
	hp: 100,
	img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
	weapon: ['Ледяной скипетр', 'Ледяной меч'],
	changeHP,
	elHP,
	renderHP,
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

function playerAttack() {
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
	return attack;
}

function showResult() {
	if (player1.hp === 0 || player2.hp === 0) {
		$randomButton.disabled = true;
		createReloadButton();
	}
	if (player1.hp === 0 && player1.hp < player2.hp) {
		$arenas.appendChild(playerWins(player2.name));
		generateLogs('end', player2, player1);
	} else if (player2.hp === 0 && player2.hp < player1.hp) {
		$arenas.appendChild(playerWins(player1.name));
		generateLogs('end', player1, player2);
	} else if (player2.hp === 0 && player1.hp === 0) {
		$arenas.appendChild(playerWins());
		generateLogs('draw');
	}
}

function time() {
	const date = new Date();
	const normalize = (num) => (num.toString().length > 1 ? num : `0${num}`);
	return `${normalize(date.getHours())}:${normalize(date.getMinutes())}:${normalize(date.getSeconds())}`;
}

function generateLogs(type, player1, player2, damage = 0) {
	let text = '';
	switch (type) {
		case 'start':
			text = logs[type].
				replace('[player1]', player1.name).
				replace('[player2]', player2.name).
				replace('[time]', time());
			console.log(text);
			break;
		case 'hit':
			text = time() + ' - ' +
				logs[type][getRandom(logs[type].length) - 1].
				replace('[playerKick]', player1.name).
				replace('[playerDefence]', player2.name) +
				' - ' + damage + 
				'[' + player1.hp + '/100]';
			break;
		case 'defence':
			text = time() + ' - ' +
				logs[type][getRandom(logs[type].length) - 1].
				replace('[playerKick]', player1.name).
				replace('[playerDefence]', player2.name);
			break;
		case 'end':
			text = logs[type][getRandom(logs[type].length) - 1].
				replace('[playerWins]', player1.name).
				replace('[playerLose]', player2.name);
			break;
		case 'draw':
			text = logs[type][getRandom(logs[type].length) - 1];
			break;
		default:
			text = 'Игра сломалась :(';
	}
	const el = `<p>${text}</p>`;
	$chat.insertAdjacentHTML('afterbegin', el);
}

generateLogs('start', player1, player2);

$formFight.addEventListener('submit', function(e) {
	e.preventDefault();
	const enemy = enemyAttack();
	const player = playerAttack();
	
	if (player.defence !== enemy.hit) {
		player1.changeHP(enemy.value);
		player1.renderHP();
		generateLogs('hit', player1, player2, enemy.value);
	} else {
		generateLogs('defence', player1, player2);
	}
	if (enemy.defence !== player.hit) {
		player2.changeHP(enemy.value);
		player2.renderHP();
		generateLogs('hit', player2, player1, enemy.value);
	} else {
		generateLogs('defence', player2, player1);
	}
	showResult();
})
