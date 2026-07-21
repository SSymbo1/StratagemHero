<div align="center">
	<h1>StratagemHero
</h1>
	<img src="./public/icons/stratagems/eagle_airstrike.svg" width="150" align="center" alt="StratagemHero 图标" />
	<br/> <br/>
	<strong>战略配备英雄网页版</strong>
</div>

<div align="center">

**中文** | [**English**](./README_en.md)

</div>

### 介绍

StratagemHero 是一个基于 Vite、Vue 3、TypeScript 和 Tailwind CSS 的网页小游戏，灵感来自《绝地潜兵 2》的战略配备输入玩法。玩家需要通过键盘、WASD 或触屏滑动快速输入方向序列，在倒计时内完成尽可能多的战略配备。

### 功能特性

- 支持方向键、WASD 和移动端滑动输入。
- 根据回合动态生成战略配备列表和输入序列。
- 提供倒计时、补时、回合结算、完美回合奖励和排行榜展示。
- 使用 Pinia 管理分数，并通过 localStorage 保留历史最高分。
- 支持中文和英文界面。
- 内置背景音乐、按键音效、错误音效、结算音效和游戏结束音效。

### 初始化

```bash
pnpm install --frozen-lockfile
```

### 启动

```bash
pnpm run dev
```

### 打包

```bash
pnpm run build
```

### 常用命令

```bash
pnpm run typecheck
pnpm run check
pnpm run lint
pnpm run preview
```

- `pnpm run typecheck`：运行 Vue 与 TypeScript 类型检查。
- `pnpm run check`：依次执行 lint、类型检查和生产构建检查。
- `pnpm run lint`：执行 ESLint 代码规范检查。
- `pnpm run preview`：本地预览生产构建产物。

### 项目结构

```
├── .github
│   └── workflows       (GitHub Actions CI/CD 工作流)
├── public
│   ├── audio           (游戏音频资源)
│   ├── font            (游戏字体资源)
│   └── icons
│       ├── background  (游戏背景图片)
│       └── stratagems  (战略配备图标)
├── scripts             (构建、检查和发布说明脚本)
├── src
│   ├── assets
│   │   └── css         (Tailwind 与字体入口)
│   ├── components
│   │   ├── common      (通用展示组件)
│   │   ├── component   (游戏基础组件)
│   │   ├── home        (首页组件)
│   │   ├── layout      (页面布局组件)
│   │   └── level       (关卡与排行榜组件)
│   ├── constants       (游戏常量与静态配置)
│   ├── hooks           (组合式交互逻辑)
│   ├── lang            (国际化配置与文案)
│   ├── router          (页面路由)
│   ├── store           (Pinia 状态管理)
│   ├── types           (共享类型定义)
│   ├── utils           (纯函数与工具类)
│   ├── App.vue
│   ├── main.ts
│   └── vite-env.d.ts
├── package.json
├── pnpm-lock.yaml
└── vite.config.ts
```

### 本地部署游玩

Releases：https://github.com/SSymbo1/StratagemHero/releases

本项目的 Vite `base` 配置为 `/StratagemHero`，使用 Nginx 或其他静态服务器部署时，请确保访问路径与该配置一致。

#### 1.下载 Release 和 Nginx

- Nginx 官网：
- https://nginx.org/en/download.html

下载任意 `nginx/Windows-X.XX.X` 版本并解压，建议选择 Stable version。

#### 2.配置 Nginx

- 将 Release 中的 **dist** 文件夹复制到解压后的 Nginx **html** 文件夹中。
- 将 Release 中的 **nginx.conf** 文件复制到解压后的 Nginx **conf** 文件夹中，并替换原有 **nginx.conf**。

#### 3.启动 Nginx

- 回到 Nginx 文件夹，双击 **nginx.exe** 启动。
- 在任务管理器中搜索 nginx，若存在对应进程则表示启动成功。
- 在浏览器中访问 **localhost:8081/StratagemHero/** 即可开始游戏。

### 特别感谢

- 战略配备图标来源：
- https://github.com/nvigneux/Helldivers-2-Stratagems-icons-svg

### 其他

- 如果启动 Nginx 遇到报错，或启动后任务管理器中没有 nginx 进程，请确认本机已安装 **Node.js**，并检查 Nginx 配置路径是否正确。
- 遇到其他问题请创建 issue。
