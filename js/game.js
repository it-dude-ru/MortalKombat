import { player1, player2 } from './players.js';
import { $arenas, $formFight } from './getElements.js';
import createPlayer from './createplayer.js';
import showResult from './showResult.js';
import generateLogs from './generateLogs.js';

export default class Game {
	constructor() {
		$arenas.appendChild(createPlayer(player1));
		$arenas.appendChild(createPlayer(player2));
	}
	start = () => {
		generateLogs('start', player1, player2);

		$formFight.addEventListener('submit', function (e) {
			e.preventDefault();
			const robot = player2.attack();
			const human = player1.attack();

			if (human.defence !== robot.hit) {
				player1.changeHP(robot.value);
				player1.renderHP();
				generateLogs('hit', player1, player2, robot.value);
			} else {
				generateLogs('defence', player1, player2);
			}
			if (robot.defence !== human.hit) {
				player2.changeHP(robot.value);
				player2.renderHP();
				generateLogs('hit', player2, player1, human.value);
			} else {
				generateLogs('defence', player2, player1);
			}
			showResult();
		})
	}
}