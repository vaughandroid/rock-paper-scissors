import { createInterface } from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'

export interface UserInterface {
  print(message: string): void
  ask(prompt: string): Promise<string>
  close(): void
}

export function createUI(): UserInterface {
  const rl = createInterface({ input, output })
  return {
    print(message: string) { console.log(message) },
    ask(prompt: string) { return rl.question(prompt) },
    close() { rl.close() },
  }
}
