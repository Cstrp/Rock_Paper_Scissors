import { Move } from './types';

class TableGenerator {
  public setTable(moves: Move[]): string {
    const movesNames = moves.map((move) => move.name);
    const numOfMoves = movesNames.length;
    const header = ['Moves', ...movesNames];
    const table = [header];

    for (let i = 0; i < numOfMoves; i++) {
      const row = [movesNames[i], ...this.getRowResult(i, numOfMoves)];
      table.push(row);
    }

    const colWidth = this.getCollWidth(table);
    const formattedTable = table.map((row) => this.formatRow(row, colWidth));

    return formattedTable.join('\n');
  }

  private getCollWidth(table: string[][]): number[] {
    const collWidth: number[] = [];

    for (let i = 0; i < table[0].length; i++) {
      const col: string[] = table.map((row) => row[i]);
      const maxWidth: number = Math.max(...col.map((cell) => cell.length));
      collWidth.push(maxWidth);
    }

    return collWidth;
  }

  private getRowResult(idx: number, numOfMoves: number): string[] {
    const result: string[] = [];

    for (let i = 0; i < numOfMoves; i++) {
      if (i === idx) {
        result.push('Draw');
      } else if ((i - idx + numOfMoves) % numOfMoves <= numOfMoves / 2) {
        result.push('Win');
      } else {
        result.push('Lose');
      }
    }

    return result;
  }

  private formatRow(row: string[], colWidth: number[]): string {
    const formattedRow = row.map((cell, idx) => cell.padEnd(colWidth[idx])).join(' | ');

    return `| ${formattedRow} |`;
  }
}

export const tableGenerator = new TableGenerator();
