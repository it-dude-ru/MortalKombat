import { $arenas, $randomButton } from './getElements.js';
import { playerWins } from './playerWins.js';
import generateLogs from "./generateLogs.js";
import { createReloadButton } from './createReloadButton.js';

export default function showResult(player1, player2) {
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

