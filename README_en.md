<div align="center">
	<h1>StratagemHero
</h1>
	<img src="./public/icons/stratagems/eagle_airstrike.svg" width="150" align="center" alt="StratagemHero icon" />
	<br/> <br/>
	<strong>Stratagem Hero Web Edition</strong>
</div>

<div align="center">

[**中文**](./README.md) | **English**

</div>

### Introduction

StratagemHero is a web mini-game built with Vite, Vue 3, TypeScript, and Tailwind CSS. It is inspired by the stratagem input gameplay from Helldivers 2. Players use arrow keys, WASD, or touch swipes to enter direction sequences as quickly as possible before the countdown ends.

### Features

- Supports arrow keys, WASD, and mobile swipe input.
- Dynamically generates stratagem lists and input sequences by round.
- Provides countdown timing, time bonuses, round results, perfect round bonuses, and leaderboard display.
- Uses Pinia for score state and localStorage for historical best scores.
- Supports Chinese and English UI text.
- Includes background music, key press effects, error effects, result effects, and game over audio.

### Installation

```bash
pnpm install --frozen-lockfile
```

### Development

```bash
pnpm run dev
```

### Build

```bash
pnpm run build
```

### Common Commands

```bash
pnpm run typecheck
pnpm run check
pnpm run lint
pnpm run preview
```

- `pnpm run typecheck`: runs Vue and TypeScript type checking.
- `pnpm run check`: runs lint, type checking, and production build checks in sequence.
- `pnpm run lint`: runs ESLint code style checks.
- `pnpm run preview`: previews the production build locally.

### Project Structure

```
├── .github
│   └── workflows       (GitHub Actions CI/CD workflows)
├── public
│   ├── audio           (game audio assets)
│   ├── font            (game font assets)
│   └── icons
│       ├── background  (game background images)
│       └── stratagems  (stratagem icons)
├── scripts             (build, check, and release note scripts)
├── src
│   ├── assets
│   │   └── css         (Tailwind and font entry)
│   ├── components
│   │   ├── common      (shared display components)
│   │   ├── component   (core game components)
│   │   ├── home        (home page components)
│   │   ├── layout      (page layout components)
│   │   └── level       (level and leaderboard components)
│   ├── constants       (game constants and static settings)
│   ├── hooks           (composable interaction logic)
│   ├── lang            (i18n config and messages)
│   ├── router          (page router)
│   ├── store           (Pinia state management)
│   ├── types           (shared type definitions)
│   ├── utils           (pure functions and utility classes)
│   ├── App.vue
│   ├── main.ts
│   └── vite-env.d.ts
├── package.json
├── pnpm-lock.yaml
└── vite.config.ts
```

### Play in a Local Environment

Releases: https://github.com/SSymbo1/StratagemHero/releases

The Vite `base` option is configured as `/StratagemHero`. When deploying with Nginx or another static server, make sure the access path matches this configuration.

#### 1.Download Release and Nginx

- Nginx official website:
- https://nginx.org/en/download.html

Download and extract any `nginx/Windows-X.XX.X` version. The Stable version is recommended.

#### 2.Configure Nginx

- Copy the **dist** folder from the Release package into the extracted Nginx **html** folder.
- Copy the **nginx.conf** file from the Release package into the extracted Nginx **conf** folder and replace the existing **nginx.conf**.

#### 3.Start Nginx

- Go back to the Nginx folder and double-click **nginx.exe** to start it.
- Search for nginx in Task Manager. If a matching process exists, Nginx has started successfully.
- Visit **localhost:8081/StratagemHero/** in your browser to start the game.

### Special Thanks

- Stratagem icon source:
- https://github.com/nvigneux/Helldivers-2-Stratagems-icons-svg

### Other

- If Nginx fails to start, or if no nginx process appears in Task Manager after startup, make sure **Node.js** is installed and check whether the Nginx configuration path is correct.
- Please create an issue if you encounter any other problem.
