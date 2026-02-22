import type { Move, Outcome } from './types.ts'

const beats: Record<Move, Move> = {
  rock: 'scissors',
  scissors: 'paper',
  paper: 'rock',
}

export function determineOutcome(player: Move, cpu: Move): Outcome {
  if (player === cpu) return 'draw'
  return beats[player] === cpu ? 'win' : 'lose'
}

export function randomMove(): Move {
  const moves: Move[] = ['rock', 'paper', 'scissors']
  return moves[Math.floor(Math.random() * moves.length)]
}
