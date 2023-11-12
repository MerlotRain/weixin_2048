/// <reference path="./grid.ts" />

class Main {
  private size: number;
  private startData: number;
  private board: Board;

  constructor(size: number) {
    this.size = size;
    this.startData = 2;
    this.board = new Board(size);
    this.setRandomData();
    this.startData = 1;
  }

  setRandomData() {
    for (let i = 0; i < this.startData; i++) {
      this.addRandomData();
    }
  }

  addRandomData() {
    if (!this.board.cellEmpty()) {
      let value = Math.random() < 0.9 ? 2 : 4;
      let cell = this.board.selectedCell() as Cell;
      cell.value = value;
      this.update(cell);
    }
  }

  update(cell: Cell) {
    this.board.grid[cell.x][cell.y] = cell.value;
  }

  move(dir: number): number[][] {
    let curList = this.formList(dir);

    let list = this.combine(curList);
    let result: number[][] = new Array(this.size);
    for (let i = 0; i < this.size; i++) {
      result[i] = new Array(this.size);
      for (let j = 0; j < this.size; j++) {
        switch (dir) {
          case 0:
            result[i][j] = list[j][i];
            break;
          case 1:
            result[i][j] = list[i][this.size - 1 - j];
            break;
          case 2:
            result[i][j] = list[j][this.size - 1 - i];
            break;
          case 3:
            result[i][j] = list[i][j];
            break;
        }
      }
    }
    this.board.grid = result;
    this.setRandomData();
    return result;
  }

  formList(dir: number) {
    let list: number[][] = new Array(this.size);
    for (let i = 0; i < this.size; i++) {
      list[i] = new Array(this.size);
      for (let j = 0; j < this.size; j++) {
        switch (dir) {
          case 0:
            list[i].push(this.board.grid[j][i]);
            break;
          case 1:
            list[i].push(this.board.grid[i][this.size - 1 - j]);
            break;
          case 2:
            list[i].push(this.board.grid[this.size - 1 - j][i]);
            break;
          case 3:
            list[i].push(this.board.grid[i][j]);
            break;
        }
      }
    }
    return list;
  }

  combine(list: number[][]): number[][] {
    for (let i = 0; i < list.length; i++) {
      list[i] = this.changeItem(list[i]);
    }

    for (let i = 0; i < this.size; i++) {
      for (let j = 1; j < this.size; j++) {
        if (list[i][j - 1] == list[i][j] && list[i][j] != -1) {
          list[i][j - 1] += list[i][j];
          list[i][j] = -1;
        }
      }
    }

    for (let i = 0; i < list.length; i++) list[i] = this.changeItem(list[i]);

    return list;
  }

  changeItem(item: number[]): number[] {
    let cnt = 0;
    for (let i = 0; i < item.length; i++) {
      if (item[i] != -1) item[cnt++] = item[i];
    }
    for (let i = cnt; i < item.length; i++) item[i] = -1;
    return item;
  }

  isOver() {
    if (!this.board.cellEmpty()) {
      return false;
    } else {
      for (let i = 0; i < this.size; i++) {
        for (let j = 0; j < this.size; j++) {
          if (this.board.grid[i][j] == this.board.grid[i][j - 1]) return false;
        }
      }
      for (let i = 0; i < this.size; i++) {
        for (let j = 0; j < this.size; j++) {
          if (this.board.grid[i][j] == this.board.grid[i - 1][j]) return false;
        }
      }
    }
    return true;
  }
}
