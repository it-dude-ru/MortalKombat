export function changeHP(damage) {
	if (this.hp < damage) {
		this.hp = 0;
	} else {
		this.hp -= damage;
	}
}

const elHP = (id) => document.querySelector('.player' + id + ' .life');

export function renderHP() {
	elHP(this.player).style.width = this.hp + '%';
}
