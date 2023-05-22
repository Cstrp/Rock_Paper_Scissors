import * as process from 'process';
import { Game } from './Data';

const moves: string[] = process.argv.slice(2);

try {
  const game: Game = new Game(moves);
  game.play();
} catch (error) {
  console.error(error);
}
