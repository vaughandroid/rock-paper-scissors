import { describe, it, expect } from 'vitest'
import { determineOutcome } from '../src/game.ts'

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
