import { spawnSync } from 'node:child_process'
import process from 'node:process'

const isWindows = process.platform === 'win32'
const packageManager = isWindows ? 'pnpm.cmd' : 'pnpm'

for (const script of ['lint', 'typecheck', 'build:app']) {
  const command = isWindows ? `${packageManager} run ${script}` : packageManager
  const args = isWindows ? [] : ['run', script]

  const result = spawnSync(command, args, {
    shell: isWindows,
    stdio: 'inherit',
  })

  if (result.error)
    throw result.error

  if (result.status !== 0) {
    process.exitCode = result.status ?? 1
    break
  }
}
