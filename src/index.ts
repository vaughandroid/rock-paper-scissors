import { createInterface } from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'
import type { Move, Choice } from './types.ts'
import { determineOutcome, randomMove } from './game.ts'

const VALID_MOVES: Move[] = ['rock', 'paper', 'scissors']
const VALID_CHOICES: Choice[] = [...VALID_MOVES, 'quit']

const rl = createInterface({ input, output })

async function getPlayerChoice(): Promise<Choice> {
  while (true) {
    const answer = (await rl.question('Your move (rock/paper/scissors) or quit: ')).trim().toLowerCase()
    if (VALID_CHOICES.includes(answer as Choice)) return answer as Choice
    console.log('Invalid move. Please enter rock, paper, or scissors.')
  }
}

async function main() {
  console.log('Rock, Paper, Scissors!\n')

  while (true) {
    const choice = await getPlayerChoice()
    if (choice === 'quit') break

    const cpu = randomMove()
    const outcome = determineOutcome(choice, cpu)

    console.log(`CPU chose: ${cpu}`)
    console.log(outcome === 'win' ? 'You win!' : outcome === 'lose' ? 'You lose!' : "It's a draw!")
    console.log()
  }

  rl.close()
  console.log('Thanks for playing!')
}

main()
