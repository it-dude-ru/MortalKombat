import { HIT, ATTACK } from './consts.js';
import { $formFight } from './getElements.js';
import { getRandom } from './utils.js';

class Player {
	constructor(props) {
		this.player = props.player,
		this.name = props.name,
		this.hp = props.hp,
		this.img = props.img
	}
	elHP = () => document.querySelector(`.player${this.player} .life`);
	changeHP = function(damage) {
		if (this.hp < damage) {
			this.hp = 0;
		} else {
			this.hp -= damage;
		}
	}
	renderHP = () => this.elHP().style.width = this.hp + '%';
}

class Player1 extends Player {
	constructor(props) {
		super(props);
	}
	attack = function () {  // бывшая playerAttack
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
}

class Player2 extends Player {
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


export const player1 = new Player1 ({
	player: 1,
 	name: 'Sub-Zero',
 	hp: 100,
 	img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif'
})


export const player2 = new Player2 ({
	player: 2,
	name: 'Liu Kang',
	hp: 100,
	img: 'http://reactmarathon-api.herokuapp.com/assets/liukang.gif'
})
