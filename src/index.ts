import { createInterface } from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'
import type { Move } from './types.ts'
import { determineOutcome, randomMove } from './game.ts'

const VALID_MOVES: Move[] = ['rock', 'paper', 'scissors']

const rl = createInterface({ input, output })

async function getPlayerMove(): Promise<Move> {
  while (true) {
    const answer = (await rl.question('Your move (rock/paper/scissors): ')).trim().toLowerCase()
    if (VALID_MOVES.includes(answer as Move)) return answer as Move
    console.log('Invalid move. Please enter rock, paper, or scissors.')
  }
}

async function main() {
  console.log('Rock, Paper, Scissors!\n')

  while (true) {
    const player = await getPlayerMove()
    const cpu = randomMove()
    const outcome = determineOutcome(player, cpu)

    console.log(`CPU chose: ${cpu}`)
    console.log(outcome === 'win' ? 'You win!' : outcome === 'lose' ? 'You lose!' : "It's a draw!")
    console.log()

    const again = (await rl.question('Play again? (y/n): ')).trim().toLowerCase()
    if (again !== 'y') break
    console.log()
  }

  rl.close()
  console.log('Thanks for playing!')
}

main()
