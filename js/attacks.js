import { HIT, ATTACK } from './consts.js';
import { $formFight } from './getElements.js';
import { getRandom } from './getRandom.js';

export function enemyAttack() {
	const hit = ATTACK[getRandom(3) - 1];
	const defence = ATTACK[getRandom(3) - 1];

	return {
		value: getRandom(HIT[hit]),
		hit,
		defence
	};
}
export function playerAttack() {
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
