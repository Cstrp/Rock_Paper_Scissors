import { Move } from './move';

export class Rules {
  private moves: Move[] = [];

  constructor(moves: Move[]) {
    this.moves = moves;
  }

  public setRules(): string[][] {
    const numberOfMoves = this.moves.length;
    const rules: string[][] = [];

    for (let i = 0; i < numberOfMoves; i++) {
      const rule: string[] = [];
      for (let j = 0; j < numberOfMoves; j++) {
        if (i === j) {
          rule.push('Draw');
        } else if ((j - i + numberOfMoves) % numberOfMoves <= numberOfMoves / 2) {
          rule.push('Win');
        } else {
          rule.push('Lose');
        }
      }
      rules.push(rule);
    }

    return rules;
  }
}
