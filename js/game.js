import { Player1, Player2 } from './players.js';
import { $arenas, $formFight } from './getElements.js';
import showResult from './showResult.js';
import generateLogs from './generateLogs.js';
import { getRandom } from './utils.js';

let player1;
let player2;

export default class Game {
	getRandPlayer = async () =>
		fetch('https://reactmarathon-api.herokuapp.com/api/mk/player/choose').
			then(res => res.json());
	fixHttp = (urlAddress) => urlAddress.replace('http', 'https');
	start = async () => {
		const p1 = JSON.parse(localStorage.getItem('player1'));;
		let p2;
		do {
			p2 = await this.getRandPlayer();
		} while (p1.name === p2.name);
		p1.img = this.fixHttp(p1.img);
		p2.img = this.fixHttp(p2.img);
		player1 = new Player1({
			...p1,
			player: 1,
		});
		player2 = new Player2({
			...p2,
			player: 2,
		});
		$arenas.appendChild(player1.renderPlayer());
		$arenas.appendChild(player2.renderPlayer());

		generateLogs('start', player1, player2);

		$formFight.addEventListener('submit', function async (e) {
			e.preventDefault();

			const humanAttack = player1.attack();
			const getAttack = async () =>
				fetch('https://reactmarathon-api.herokuapp.com/api/mk/player/fight', {
					method: 'POST',
					body: JSON.stringify(humanAttack)
				})
				.then(res => res.json())
				.then(attack => {
				const human = attack.player1;
				const robot = attack.player2;

				if (human.defence !== robot.hit) {
					player1.changeHP(robot.value);
					player1.renderHP();
					generateLogs('hit', player1, player2, robot.value);
				} else {
					generateLogs('defence', player1, player2);
				}
				if (robot.defence !== human.hit) {
					player2.changeHP(human.value);
					player2.renderHP();
					generateLogs('hit', player2, player1, human.value);
				} else {
					generateLogs('defence', player2, player1);
				}
				showResult(player1, player2);
			});
			getAttack();
		})
	}
}
