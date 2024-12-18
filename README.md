<div align="center">
	<h1>StratagemHero
</h1>
	<img src="./public/icons/stratagems/eagle_airstrike.svg" width="150" align="center" />
	<br/> <br/>
	<strong>战略配备英雄网页版</strong>
</div>

### 介绍

Vite+ts+Vue3项目，绝地遣兵2战略配备英雄小游戏

### 特别感谢

- 1.战备图标和指令：

- https://github.com/nvigneux/Helldivers-2-Stratagems-icons-svg

### 初始化

```bash
  pnpm install
```

### 启动

```bash
  pnpm run dev  
```

### 打包

```bash
  pnpm run build
```    

### 项目结构

```
├── public
│   ├── icons
│   │   └── stratagems  (战备图标文件)
├── src
│   ├── assets
│   │   ├── css         (组件css样式表)
│   │   ├── json        (游戏全局配置)
│   │   └── ts          (ts脚本)
│   ├── components
│   │   ├── component   (自定义组件)
│   │   ├── home        (首页组件)
│   │   └── level       (关卡组件)
│   ├── router
│   ├── store
│   │   └── base        (pinia库)
│   ├── App.vue
│   ├── main.ts
│   └── vite-env.d.ts
```

### 本地部署游玩

Releases：https://github.com/SSymbo1/StratagemHero/releases

#### 1.在下载该项目 Releases ,并下载 Nginx

- Nginx官网：
- https://nginx.org/en/download.html

下载任意版本 nginx/Windows-X.XX.X 并解压，建议下载 Stable version 版本的 Nginx

#### 2.配置 Nginx

- 将 Releases 中的 **dist** 文件夹复制到解压后 Nginx 中的 **html** 文件夹中

- 将 Releases 中的 **nginx.conf** 文件复制到解压后 Nginx 中的 **conf** 文件夹中替换其中的 **nginx.conf** 文件

#### 3.启动 Nginx

- 回到 Nginx 文件夹，双击 **nginx.exe** 启动，在任务管理器中搜索 nginx 如果有相应进程则代表启动成功，如果要关闭则右键结束进程
- 在浏览器中输入 **localhost:8081/StratagemHero/** 即可访问游戏

### 其他

- 如果启动 Nginx 遇到任何报错，或启动 Nginx 后任务管理器没有找到 nginx 进程，请确保自己的计算机是否有 **NodeJS** 环境，如何配置 **NodeJS** 请自行查找
- 遇到其他问题请创建 issue
