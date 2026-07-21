import { spawnSync } from 'node:child_process'
import process from 'node:process'

const packageManager = process.platform === 'win32' ? 'pnpm.cmd' : 'pnpm'

for (const script of ['lint', 'typecheck', 'build:app']) {
  const result = spawnSync(packageManager, ['run', script], {
    stdio: 'inherit',
  })

  if (result.error)
    throw result.error

  if (result.status !== 0) {
    process.exitCode = result.status ?? 1
    break
  }
}
