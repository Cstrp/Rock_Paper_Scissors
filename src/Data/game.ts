import * as process from 'process';
import { Move as MT } from './types';
import { keyGen, Move, Rules, tableGenerator } from './utils';

export class Game {
  readonly moves: MT[] = [];
  readonly rules: string[][];

  constructor(moves: string[]) {
    if (moves.length < 3 || moves.length % 2 === 0 || !this.uniqueMoves(moves)) {
      throw new Error('Invalid moves. Provide an odd number of moves');
    }

    this.moves = moves.map((move, idx) => new Move(move, idx));
    const rules = new Rules(this.moves);

    this.rules = rules.setRules();
  }

  public play(): void {
    const key = keyGen.generateKey(256);
    const botMove = this.moves[Math.floor(Math.random() * this.moves.length)];

    console.log(`HMAC: ${keyGen.calculateHMAC(key, botMove.name)}`);
    console.log('Available moves: ');
    this.moves.forEach((move) => console.log(`${move.idx + 1} - ${move.name}`));
    console.log('? - help');
    console.log('0 - exit');

    const stdin = process.openStdin();
    console.log('Choose your move:');
    stdin.addListener('data', (input) => {
      const choice = input.toString().trim();

      if (choice === '0') {
        console.log('Bye bye...');
        process.exit(0);
      }

      if (choice === 'help') {
        this.showTable();
        console.log('Choose your move:');
        return;
      }

      const numericChoice = parseInt(choice, 10);
      const userMove = this.moves.find((move) => move.idx === numericChoice - 1);

      if (userMove) {
        console.log(`Your move: ${userMove.name}`);
        console.log(`Computer move: ${botMove.name}`);
        console.log(`Result: ${this.rules[userMove.idx][botMove.idx]}`);
        console.log(`Key: ${key}`);
      } else {
        console.log('Invalid input. Please choose a valid move or enter 0 to exit.');
      }
    });
  }

  private uniqueMoves(moves: string[]): boolean {
    const uniqueMoves = new Set(moves);
    return uniqueMoves.size == moves.length;
  }

  private showTable(): void {
    const table = tableGenerator.setTable(this.moves);
    console.log(table);
  }
}
