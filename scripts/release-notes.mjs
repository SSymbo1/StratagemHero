import { readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import process from 'node:process'

const eventFile = process.env.GITHUB_EVENT_PATH

if (!eventFile)
  throw new Error('缺少 GITHUB_EVENT_PATH，无法读取 GitHub 事件数据')

const event = JSON.parse(await readFile(eventFile, 'utf8'))
const pullRequest = event.pull_request

if (!pullRequest)
  throw new Error('当前 GitHub 事件不包含 Pull Request 数据')

const outputFile = resolve(process.argv[2] ?? 'release-notes.md')
const description = pullRequest.body?.trim() || '该 Pull Request 未提供变更说明。'
const author = pullRequest.user?.login ?? '未知'
const mergedAt = pullRequest.merged_at ?? '未知'
const mergeCommit = pullRequest.merge_commit_sha ?? '未知'

const releaseNotes = [
  '## 变更说明',
  '',
  description,
  '',
  '## 合并信息',
  '',
  `- Pull Request：[#${pullRequest.number}](${pullRequest.html_url})`,
  `- 标题：${pullRequest.title}`,
  `- 作者：@${author}`,
  `- 合并时间：${mergedAt}`,
  `- 合并提交：\`${mergeCommit}\``,
  '',
].join('\n')

await writeFile(outputFile, releaseNotes, 'utf8')
