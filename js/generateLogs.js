import { LOGS } from './consts.js';
import { $chat } from './getElements.js';
import { getRandom } from './getRandom.js';
import time from "./time.js";


export default function generateLogs(type, player1, player2, damage = 0) {
	let text = '';
	switch (type) {
		case 'start':
			text = LOGS[type].
				replace('[player1]', player1.name).
				replace('[player2]', player2.name).
				replace('[time]', time());
			break;
		case 'hit':
			text = time() + ' - ' +
				LOGS[type][getRandom(LOGS[type].length) - 1].
					replace('[playerKick]', player1.name).
					replace('[playerDefence]', player2.name) +
				' - ' + damage +
				'[' + player1.hp + '/100]';
			break;
		case 'defence':
			text = time() + ' - ' +
				LOGS[type][getRandom(LOGS[type].length) - 1].
					replace('[playerKick]', player1.name).
					replace('[playerDefence]', player2.name);
			break;
		case 'end':
			text = LOGS[type][getRandom(LOGS[type].length) - 1].
				replace('[playerWins]', player1.name).
				replace('[playerLose]', player2.name);
			break;
		case 'draw':
			text = LOGS[type][getRandom(LOGS[type].length) - 1];
			break;
		default:
			text = 'Игра сломалась :(';
	}
	const el = `<p>${text}</p>`;
	$chat.insertAdjacentHTML('afterbegin', el);
}
