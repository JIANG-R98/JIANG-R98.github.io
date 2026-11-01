# Jiang

一个极简个人主页：整页空白，只有居中的等宽 `Jiang` 和页脚的备案号占位。

## 文件

```text
.
├── index.html          # 全部页面内容与样式
├── robots.txt
├── sitemap.xml
├── .nojekyll
└── README.md
```

## 本地预览

```bash
python3 -m http.server 8000
```

打开 <http://localhost:8000>。

## 修改

- 名字：修改 `index.html` 里的 `<h1>Jiang</h1>`。
- 备案号：把页脚的 `京ICP备XXXXXXXX号-1` 替换为真实备案号，保留 `beian.miit.gov.cn` 链接。
- 不备案：直接删除页脚那一条链接即可，不要保留假备案号。

## 部署

仓库 `JIANG-R98.github.io` 是 GitHub Pages 用户主页仓库，从 `main` 分支根目录发布。推送后自动构建：

```bash
git add index.html README.md
git commit -m "简化页面"
git push
```

线上地址：<https://jiang-r98.github.io/>。

如果部署到国内服务器，只需要把 `index.html` 放到 Nginx 静态目录；这个页面没有构建步骤，也没有 JavaScript 依赖。
