import { spawnSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import process from 'node:process'

const isWindows = process.platform === 'win32'
const pnpmCommand = isWindows ? 'pnpm.cmd' : 'pnpm'

/**
 * 执行命令，并在命令失败时中断当前提交流程。
 * @param {string} command 命令名称。
 * @param {string[]} args 命令参数。
 * @param {{ encoding?: BufferEncoding, inherit?: boolean, shell?: boolean }} options 执行选项。
 * @returns {import('node:child_process').SpawnSyncReturns<string | Buffer>} 命令执行结果。
 */
function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    encoding: options.encoding,
    shell: options.shell ?? false,
    stdio: options.inherit ? 'inherit' : 'pipe',
  })

  if (result.status !== 0) {
    process.exit(result.status ?? 1)
  }

  return result
}

/**
 * 读取本次提交开始前已经暂存的文件列表。
 * @returns {string[]} 已暂存文件路径列表。
 */
function getStagedFiles() {
  const result = run('git', ['diff', '--cached', '--name-only', '--diff-filter=ACMR'], {
    encoding: 'utf8',
  })

  return result.stdout
    .split(/\r?\n/)
    .map(file => file.trim())
    .filter(Boolean)
}

const stagedFiles = getStagedFiles()

if (stagedFiles.length === 0) {
  process.exit(0)
}

run(isWindows ? `${pnpmCommand} run lint:fix` : pnpmCommand, isWindows ? [] : ['run', 'lint:fix'], {
  inherit: true,
  shell: isWindows,
})

const existingStagedFiles = stagedFiles.filter(file => existsSync(file))

if (existingStagedFiles.length > 0) {
  // 只回填本次提交原本已暂存的文件，避免带入无关未跟踪文件。
  run('git', ['add', '--', ...existingStagedFiles], {
    inherit: true,
  })
}
