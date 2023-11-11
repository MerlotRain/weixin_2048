interface Cell {
  x: number;
  y: number;
}

class Board {
  private size: number;
  private grid: string[][];

  constructor(size: number) {
    this.size = size;
    this.grid = new Array(size);
    for (let i = 0; i < this.size; i++) {
      this.grid[i] = new Array(size);
      for (let j = 0; i < this.size; j++) {
        this.grid[i][j] = "";
      }
    }
  }

  useFulCell(): Array<Cell> {
    let cells: Array<Cell> = new Array<Cell>();
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        if (this.grid[i][j] == "") {
          cells.push({ x: i, y: j });
        }
      }
    }
    return cells;
  }

  selectedCell(): Cell | undefined {
    let cells = this.useFulCell();
    if (cells.length) {
      return cells[Math.floor(Math.random() * cells.length)];
    }
    return undefined;
  }

  cellEmpty(): boolean {
    return !this.useFulCell().length;
  }
}
