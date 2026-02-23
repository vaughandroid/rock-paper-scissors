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

const VALID_MOVES: Move[] = ['rock', 'paper', 'scissors']
const VALID_CHOICES: Choice[] = [...VALID_MOVES, 'quit']

export function randomMove(): Move {
  return VALID_MOVES[Math.floor(Math.random() * VALID_MOVES.length)]
}

export function parseChoice(raw: string): Choice | null {
  const normalized = raw.trim().toLowerCase()
  return (VALID_CHOICES as string[]).includes(normalized) ? normalized as Choice : null
}

export async function getPlayerChoice(ui: UserInterface): Promise<Choice> {
  while (true) {
    const choice = parseChoice(await ui.ask('Your move (rock/paper/scissors) or quit: '))
    if (choice !== null) return choice
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
