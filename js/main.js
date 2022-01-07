import Game from './game.js';

const game = new Game();

game.start();


// const getAttack = async () =>
// 	fetch('http://reactmarathon-api.herokuapp.com/api/mk/player/fight', {
// 		method: 'POST',
// 		body: JSON.stringify({
// 			hit: 'head',
// 			defence: 'body',
// 		})
// 	}).
// 	then(res => res.json());
// const attack = await getAttack();
// console.log(attack);