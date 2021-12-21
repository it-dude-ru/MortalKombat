import { changeHP, renderHP } from './hp.js';

export const player1 = {
	player: 1,
	name: 'Sub-Zero',
	hp: 100,
	img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
	weapon: ['Ледяной скипетр', 'Ледяной меч'],
	changeHP,
	renderHP,
};
export const player2 = {
	player: 2,
	name: 'Liu Kang',
	hp: 100,
	img: 'http://reactmarathon-api.herokuapp.com/assets/liukang.gif',
	weapon: ['Меч Дракона', 'Нунчаки'],
	changeHP,
	renderHP,
};
