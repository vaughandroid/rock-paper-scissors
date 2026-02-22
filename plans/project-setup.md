# Plan: Rock Paper Scissors CLI — Project Setup

## Context
New Node.js + TypeScript CLI project using ESM modules. Toolchain: pnpm, Vitest.
Node.js native TypeScript support (no extra runner needed).

## Project Structure
```
rock-paper-scissors/
├── plans/
│   └── project-setup.md   # This plan
├── src/
│   ├── index.ts            # Entry point — CLI loop, user prompts
│   ├── game.ts             # Core game logic (determine winner)
│   └── types.ts            # Shared types (Move, Outcome)
├── src/game.test.ts        # Unit tests (co-located with source)
├── package.json
├── tsconfig.json
└── vitest.config.ts
```

## Steps

### 1. Create `plans/project-setup.md`
Copy this plan into the project as `plans/project-setup.md`.

### 2. Initialise package
```
pnpm init
```
Add `"type": "module"` to `package.json` for ESM.

### 3. Install dependencies
```
pnpm add -D typescript @types/node vitest
```
- No extra TS runner — Node.js native TypeScript stripping handles `node src/index.ts`
- No runtime dependencies (uses Node's built-in `readline/promises` for CLI I/O)

### 4. Create `tsconfig.json`
Strict config with `"module": "NodeNext"` and `"moduleResolution": "NodeNext"` for ESM compatibility.

### 5. Create `vitest.config.ts`
Minimal config pointing at `src/**/*.test.ts`.

### 6. Add scripts to `package.json`
```json
"scripts": {
  "start": "node src/index.ts",
  "test": "vitest run"
}
```

### 7. Scaffold source files
- `types.ts` — `Move` type (`"rock" | "paper" | "scissors"`) and `Outcome` type
- `game.ts` — pure `determineOutcome(player: Move, cpu: Move): Outcome` function
- `index.ts` — readline loop: prompt user → random CPU move → print result → ask to play again
- `game.test.ts` — unit tests covering all 9 move combinations

## Verification
- `pnpm start` — launches the game and plays a round interactively
- `pnpm test` — all unit tests pass
