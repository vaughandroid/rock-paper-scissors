import type { Move, Choice, Outcome } from './types.ts'
import type { UserInterface } from './ui.ts'

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

const VALID_MOVES: Move[] = ['rock', 'paper', 'scissors']
const VALID_CHOICES: Choice[] = [...VALID_MOVES, 'quit']

export async function getPlayerChoice(ui: UserInterface): Promise<Choice> {
  while (true) {
    const answer = (await ui.ask('Your move (rock/paper/scissors) or quit: ')).trim().toLowerCase()
    if (VALID_CHOICES.includes(answer as Choice)) return answer as Choice
    ui.print('Invalid move. Please enter rock, paper, or scissors.')
  }
}

export async function playGame(ui: UserInterface, getMove: () => Move = randomMove) {
  ui.print('Rock, Paper, Scissors!\n')

  while (true) {
    const choice = await getPlayerChoice(ui)
    if (choice === 'quit') break

    const cpu = getMove()
    const outcome = determineOutcome(choice, cpu)

    ui.print(`CPU chose: ${cpu}`)
    ui.print(outcome === 'win' ? 'You win!' : outcome === 'lose' ? 'You lose!' : "It's a draw!")
    ui.print('')
  }

  ui.close()
  ui.print('Thanks for playing!')
}
