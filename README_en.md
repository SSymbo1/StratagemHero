<div align="center">
	<h1>StratagemHero
</h1>
	<img src="./public/icons/stratagems/eagle_airstrike.svg" width="150" align="center" />
	<br/> <br/>
	<strong>Helldivers2's StratagemHero game web version</strong>
</div>

<div align="center">

[**中文**](./README.md) | [**English**](./README_en.md)

</div>

### Introduction

Vite + TypeScript + Vue3 Project: Helldivers 2 - StratagemHero Game

### Special Thanks

- 1.Stratagems Icon：

- https://github.com/nvigneux/Helldivers-2-Stratagems-icons-svg

### Initialization

```bash
  pnpm install
```

### Run

```bash
  pnpm run dev  
```

### Packaged

```bash
  pnpm run build
```    

### Structure

```
├── public
│   ├── audio           (audio files)
│   ├── font            (font files)
│   ├── icons           
│   │   ├── background  (game background images)
│   │   └── stratagems  (stratagems icons)
├── src
│   ├── assets
│   │   ├── css         (components CSS files)
│   │   ├── json        (components dependent json)
│   │   └── ts          (Typescript scripts)
│   ├── components
│   │   ├── component   (custom components)
│   │   ├── home        (home component)
│   │   └── level       (game level components)
│   ├── lang
│   │   └── locales     (translate files)
│   ├── router          (page router)
│   ├── store
│   │   └── base        (pinia store)
│   ├── App.vue
│   ├── main.ts
│   └── vite-env.d.ts
```

### Play in a Local Environment

Releases：https://github.com/SSymbo1/StratagemHero/releases

#### 1.Download Release and Nginx

- Nginx Official Website：
- https://nginx.org/en/download.html

You can download any version, such as nginx/Windows-X.XX.X, and unzip it. However, it's recommended to download the stable version of Nginx

#### 2.Setting Nginx

- Copy the **dist** folder from the Releases folder to the **html** folder in the extracted Nginx directory

- Copy the **nginx.conf** file from the Releases folder to the **conf** folder in the extracted Nginx directory, replacing the existing **nginx.conf** file

#### 3.Start Nginx

- Go back to the **Nginx** folder, double-click **nginx.exe** to start it. Then, search for 'nginx' in the Task Manager. If the corresponding process appears, it means Nginx has started successfully. To stop it, right-click and select 'End Task'
- Enter **localhost:8081/StratagemHero/** in the browser to access the game.

### Other

- If you encounter any errors when starting Nginx, or if you cannot find the Nginx process in Task Manager after starting Nginx, please make sure that **Node.js** is installed on your computer. For instructions on how to set up **Node.js**, please refer to online resources.
- If you encounter any other issues, please create an issue
