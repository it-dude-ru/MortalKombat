import { player1, player2 } from './players.js';
import { $arenas, $formFight } from './getElements.js';
import createPlayer from './createPlayer.js';
import showResult from './showResult.js';
import generateLogs from './generateLogs.js';
import { enemyAttack, playerAttack } from './attacks.js';

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

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