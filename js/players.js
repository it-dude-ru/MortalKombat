import { HIT, ATTACK } from './consts.js';
import { $formFight } from './getElements.js';
import { getRandom, createElement } from './utils.js';

class Player {
	constructor(props) {
		this.player = props.player,
		this.name = props.name,
		this.hp = props.hp,
		this.img = props.img
	}
	elHP = () => document.querySelector(`.player${this.player} .life`);
	changeHP = (damage) => {
		if (this.hp < damage) {
			this.hp = 0;
		} else {
			this.hp -= damage;
		}
	}
	renderHP = () => this.elHP().style.width = this.hp + '%';

	renderPlayer = () => {
		const $player = createElement('div', 'player' + this.player);
		const $progressbar = createElement('div', 'progressbar');
		const $character = createElement('div', 'character');
		const $life = createElement('div', 'life');
		$life.style.width = this.hp + '%';

		const $name = createElement('div', 'name');
		$name.innerText = this.name;

		const $img = createElement('img');
		$img.src = this.img;

		$player.appendChild($progressbar);
		$player.appendChild($character);
		$progressbar.appendChild($life);
		$progressbar.appendChild($name);
		$character.appendChild($img);

		return $player;
	}
}

export class Player1 extends Player {
	constructor(props) {
		super(props);
	}
	attack = function () {  // бывшая playerAttack
		const attack = {};

		for (let item of $formFight) {
			if (item.checked && item.name === 'hit') {
				//attack.value = getRandom(HIT[item.value]);
				attack.hit = item.value;
			}

			if (item.checked && item.name === 'defence') {
				attack.defence = item.value;
			}
			item.checked = false;
		}
		return attack;
	}
}

export class Player2 extends Player {
	constructor(props) {
		super(props);
	}
	attack = function () {  // бывшая enemyAttack
		const hit = ATTACK[getRandom(3) - 1];
		const defence = ATTACK[getRandom(3) - 1];

		return {
			value: getRandom(HIT[hit]),
			hit,
			defence
		};
	}
}

