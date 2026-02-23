import { describe, it, expect } from 'vitest'
import type { UserInterface } from '../src/ui.ts'
import { determineOutcome, randomMove, getPlayerChoice, playGame } from '../src/game.ts'

function createMockUI(responses: string[]) {
  const queue = [...responses]
  const events: string[] = []
  const ui: UserInterface = {
    print(message: string) { events.push(message) },
    async ask(_prompt: string) {
      const response = queue.shift()
      if (response === undefined) throw new Error('Unexpected ask — no more queued responses')
      return response
    },
    close() { events.push('[closed]') },
  }
  return { ui, events }
}

describe('randomMove', () => {
  it('returns each move with roughly equal probability', () => {
    const counts = { rock: 0, paper: 0, scissors: 0 }
    for (let i = 0; i < 10_000; i++) counts[randomMove()]++

    const expected = 10_000 / 3
    const tolerance = expected * 0.1 // within 10%
    for (const count of Object.values(counts)) {
      expect(count).toBeGreaterThan(expected - tolerance)
      expect(count).toBeLessThan(expected + tolerance)
    }
  })
})

describe('determineOutcome', () => {
  it.each([
    ['rock', 'scissors', 'win'],
    ['scissors', 'paper', 'win'],
    ['paper', 'rock', 'win'],
    ['rock', 'paper', 'lose'],
    ['scissors', 'rock', 'lose'],
    ['paper', 'scissors', 'lose'],
    ['rock', 'rock', 'draw'],
    ['paper', 'paper', 'draw'],
    ['scissors', 'scissors', 'draw'],
  ] as const)('%s vs %s → %s', (player, cpu, expected) => {
    expect(determineOutcome(player, cpu)).toBe(expected)
  })
})

describe('getPlayerChoice', () => {
  it('returns a valid move', async () => {
    const { ui } = createMockUI(['rock'])
    expect(await getPlayerChoice(ui)).toBe('rock')
  })

  it('returns quit', async () => {
    const { ui } = createMockUI(['quit'])
    expect(await getPlayerChoice(ui)).toBe('quit')
  })

  it('retries on invalid input and prints an error', async () => {
    const { ui, events } = createMockUI(['banana', 'scissors'])
    expect(await getPlayerChoice(ui)).toBe('scissors')
    expect(events).toContain('Invalid move. Please enter rock, paper, or scissors.')
  })

  it('normalises uppercase and whitespace', async () => {
    const { ui } = createMockUI(['  ROCK  '])
    expect(await getPlayerChoice(ui)).toBe('rock')
  })
})

describe('playGame', () => {
  it('prints a header, closes the UI, and prints a farewell', async () => {
    const { ui, events } = createMockUI(['quit'])
    await playGame(ui, () => 'rock')
    expect(events[0]).toBe('Rock, Paper, Scissors!\n')
    expect(events).toContain('[closed]')
    expect(events.at(-1)).toBe('Thanks for playing!')
  })

  it.each([
    ['rock', 'scissors', 'You win!'],
    ['rock', 'paper', 'You lose!'],
    ['rock', 'rock', "It's a draw!"],
  ] as const)('player=%s cpu=%s → prints "%s"', async (playerMove, cpuMove, message) => {
    const { ui, events } = createMockUI([playerMove, 'quit'])
    await playGame(ui, () => cpuMove)
    expect(events).toContain(message)
  })
})
