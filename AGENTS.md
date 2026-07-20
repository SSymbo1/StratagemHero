# Repository Guidelines

## 项目结构与模块组织

本仓库是基于 Vite、Vue 3、TypeScript 的前端小游戏项目。入口文件位于 `src/main.ts`，根组件为 `src/App.vue`。页面与功能组件放在 `src/components/`，其中 `home/`、`level/` 对应主要视图，`component/` 放通用游戏组件。路由在 `src/router/`，状态管理在 `src/store/`，国际化内容在 `src/lang/`。样式、数据与脚本资源分别位于 `src/assets/css/`、`src/assets/json/`、`src/assets/ts/`。静态资源放在 `public/`，包括 `audio/`、`font/`、`icons/background/` 和 `icons/stratagems/`。

## 构建、测试与开发命令

使用 pnpm 管理依赖，锁文件为 `pnpm-lock.yaml`。

- `pnpm install`：安装项目依赖。
- `pnpm run dev`：启动 Vite 本地开发服务器。
- `pnpm run build`：先运行 `vue-tsc -b` 类型检查，再执行生产构建。
- `pnpm run preview`：本地预览已构建产物。

当前仓库未配置自动化测试脚本；提交前至少运行 `pnpm run build` 验证类型与构建结果。

## 编码风格与命名约定

TypeScript 与 Vue 单文件组件应保持现有风格：使用 4 空格缩进，导入语句靠近文件顶部，优先使用 `@/` 别名引用 `src` 内模块。Vue 组件文件使用 PascalCase，例如 `Timer.vue`、`StratagemsLayer.vue`。普通工具脚本使用小写或下划线命名，例如 `round_time.ts`。JSON 数据文件应保持稳定字段结构，新增战备或关卡数据时同步检查相关渲染逻辑。

## 测试指南

目前没有 Vitest、Jest 或端到端测试配置。新增测试框架前，应先补充对应 `package.json` 脚本，并在本文件更新运行方式。涉及交互、计时、得分、键盘输入或多语言文本的改动，需要手动在开发服务器中验证主要流程。构建失败、类型错误或资源路径错误不得合入。

## 提交与 Pull Request 规范

现有提交历史以版本号（如 `v1.6.6`）和合并提交为主。功能开发建议使用简短、明确的提交信息，例如 `fix timer reset`、`add stratagem icons` 或 `update zh locale`。Pull Request 应包含变更摘要、验证命令、关联 issue（如有），UI 或素材改动需附截图或说明受影响页面。

## 配置与资源注意事项

Vite `base` 配置为 `/StratagemHero`，修改部署路径前需确认 GitHub Pages 或 Nginx 配置。不要提交本地环境文件、构建产物或临时调试资源。新增第三方素材时记录来源与许可，并放入合适的 `public/` 子目录。
