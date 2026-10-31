# Jiang · 个人主页

一个零依赖、零构建的单页个人主页，使用原生 HTML / CSS / JavaScript 编写。当前托管在 GitHub Pages，后续可以平滑迁移到国内服务器完成 ICP 备案。

- 线上地址：<https://jiang-r98.github.io/>
- 源码仓库：<https://github.com/JIANG-R98/JIANG-R98.github.io>

## 特性

- 单页布局：首屏、关于、项目、联系、页脚
- 响应式，适配桌面与手机
- 浅色 / 深色主题，记忆用户选择，默认跟随系统
- 无外部字体、无第三方脚本、无构建步骤
- 邮箱一键复制、备案号占位、404 页面、基础 SEO 文件
- 提供 `prefers-reduced-motion` 降级

## 目录结构

```text
.
├── index.html          # 首页（所有文案与链接都在这里）
├── 404.html            # GitHub Pages 自定义 404
├── assets/
│   ├── css/style.css   # 全部样式与主题变量
│   ├── js/main.js      # 主题切换、复制邮箱、年份
│   └── favicon.svg     # 站点图标
├── robots.txt
├── sitemap.xml
├── .nojekyll           # 关闭 GitHub Pages 的 Jekyll 处理
└── README.md
```

## 本地预览

无需安装依赖，任选一种：

```bash
# Python（macOS 自带）
python3 -m http.server 8000

# 或 Node.js
npx serve .
```

然后打开 <http://localhost:8000>。

直接双击 `index.html` 也能查看，但用本地服务器更接近线上环境。

## 上线前需要修改

| 位置 | 当前内容 | 说明 |
| --- | --- | --- |
| `index.html` | `Jiang`、自我介绍、项目卡片 | 改成你的真实姓名、简介和项目 |
| `index.html` / `404.html` | `me.zhaojiang@qq.com` | 公开邮箱；不想公开就换成联系表单或不放邮箱 |
| `index.html` / `404.html` | `京ICP备XXXXXXXX号-1` | 备案通过后替换为真实备案号，保留 `beian.miit.gov.cn` 链接 |
| `index.html` `<head>` | canonical、OG URL | 绑定自定义域名后改成新域名 |
| `robots.txt`、`sitemap.xml` | `https://jiang-r98.github.io/` | 绑定自定义域名后同步修改 |
| `README.md` | 仓库与线上地址 | 仓库改名后同步修改 |

另外，页脚目前只放了 ICP 备案占位。若当地要求公安联网备案，可在同一位置补一条链接，例如：

```html
<a href="https://beian.mps.gov.cn/#/query/webSearch" target="_blank" rel="noopener">公网安备XXXXXXXXXXXX号</a>
```

## 部署方式一：GitHub Pages（当前使用）

仓库名 `JIANG-R98.github.io` 是 GitHub Pages 的「用户主页」仓库，规则如下：

- 仓库必须公开（免费账户）
- 从 `main` 分支根目录发布
- 推送后自动构建，访问 <https://jiang-r98.github.io/>
- `404.html` 会自动作为自定义 404 页面

日常更新：

```bash
git add .
git commit -m "更新内容"
git push
```

如果 Pages 没有自动更新，到仓库 **Settings → Pages** 确认 Source 是 `Deploy from a branch`、分支是 `main`、目录是 `/ (root)`。

### 绑定自定义域名

1. 在仓库根目录新增 `CNAME` 文件，内容只写域名，例如 `example.com`（不要带 `https://`）。
2. 在域名服务商处添加解析：
   - 根域名：`A` 记录指向 GitHub Pages 的 IP（以 GitHub 官方文档当前值为准），或使用支持 CNAME flattening 的服务商
   - `www`：`CNAME` 指向 `jiang-r98.github.io`
3. 回到 **Settings → Pages** 填入域名，等待 DNS 检查通过。
4. 勾选 **Enforce HTTPS**。

> 绑定自定义域名后，建议把 `canonical`、`og:url`、`robots.txt`、`sitemap.xml` 里的地址一起改为新域名。

## 部署方式二：国内服务器 + ICP 备案（推荐用于正式备案站）

### 关键前提

**GitHub Pages 不能用于 ICP 备案。** 备案要求网站托管在中国大陆境内、由具备 IDC/ISP 资质的接入服务商提供服务器（阿里云、腾讯云、华为云等），并取得该服务商提供的「备案服务码」。GitHub Pages 的服务器在境外，只能作为预览或临时托管。

因此建议的路径是：

1. 用 GitHub Pages 先预览、打磨页面（现在这一步已经可用）。
2. 购买中国大陆地域的云服务器（轻量应用服务器即可）和已实名认证的域名。
3. 通过云厂商提交 ICP 备案，按各省管局要求填写网站名称、服务内容等。
4. 备案审核期间，按接入商要求处理域名解析；未备案域名不要解析到中国大陆服务器，否则会被拦截。
5. 备案通过后，把域名解析到服务器，部署本仓库的静态文件，配置 HTTPS。
6. 在页脚展示备案号并链接到 <https://beian.miit.gov.cn/>。
7. 网站上线后按当地要求完成公安联网备案（通常为 30 日内）。

个人备案的网站内容应与个人性质一致，不要放经营性、论坛、付费等需要额外资质的内容。具体材料、审核时长和网站名称规则以你选择的云厂商和所在省份管局为准。

### 服务器部署示例（Nginx）

把仓库里的静态文件同步到服务器：

```bash
rsync -avz --delete \
  --exclude '.git' \
  ./ user@your-server:/var/www/personal-site/
```

Nginx 配置：

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name example.com www.example.com;

    root /var/www/personal-site;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }

    error_page 404 /404.html;

    location ~* \.(css|js|svg|png|jpg|jpeg|webp|woff2)$ {
        expires 7d;
        add_header Cache-Control "public, max-age=604800";
    }
}
```

启用 HTTPS（以 Certbot 为例）：

```bash
sudo certbot --nginx -d example.com -d www.example.com
```

之后把 80 端口 301 跳转到 HTTPS，并在云厂商安全组放行 80 / 443。

### 更新流程

- **GitHub Pages**：本地提交并 `git push`，等待自动构建。
- **国内服务器**：`git push` 后，在本地执行上面的 `rsync`；也可以在服务器上 `git pull`。
- 想自动化，可加一个 GitHub Actions 工作流，在 push 后通过 SSH 部署到服务器（需要把私钥放进仓库 Secrets）。

## 技术说明

- 主题通过 `data-theme` 属性和 CSS 变量切换，选择保存在 `localStorage` 的 `jiang-site-theme` 键中。
- 首屏内联脚本在 CSS 加载前确定主题，避免闪烁。
- 不使用任何外部 CDN，国内访问不依赖第三方资源。
- GitHub Pages 在国内的访问速度和稳定性有限；正式对公网服务时，优先使用国内服务器 + 已备案域名。

## 版权

页面文案与个人内容归 Jiang 所有。代码部分可按需自行修改使用。
