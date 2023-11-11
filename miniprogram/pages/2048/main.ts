/// <reference path="./grid.ts" />

class Main {
	private size:number;
	private startData:number;
	private board:Board;

	constructor(size:number) {
		this.size = size;
		this.startData = 2;
		this.board = new Board(size);
		this.addRandomData();
		this.startData = 1;
	}

	addRandomData() {
		if(!this.board.cellEmpty()) {
			let value = Math.random() < 0.9 ? 2 : 4;
			let cell = this.board.selectedCell() as Cell;
			cell.value = value;
			this.update(cell);
		}
	}

	update(cell:Cell) {
		this.board.grid[cell.x][cell.y] = cell.value;
	}

	move(dir: number) {
	}

	formList(dir: number) {
		for(let i=0;i<this.size;i++) {
			for(let j=0; j<this.size;j++) {
				switch(dir) {
					case 0:
				}

			}
		}
	}
}