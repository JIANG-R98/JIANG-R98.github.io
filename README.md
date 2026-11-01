# Jiang

一个极简个人主页：整页空白，只有居中的等宽 `Jiang`，进入页面时逐字打出，并带一个打字机光标。备案号暂不展示。

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

- 名字：改两处——`<span class="type">Jiang</span>` 里的文字，以及 `h1` 的 `width: 5ch`、`@keyframes typing` 里的 `width: 5ch` 和 `steps(5, end)`。数字都要等于新名字的字符数（`Jiang` 是 5 个字符）。
- 打字速度：调整 `.type` 里 `typing` 动画的 `0.75s`。
- 光标：由 `.type` 的 `border-right` 模拟，`caret-blink` 控制闪烁两次，`caret-off` 控制结束后淡出；不想要光标就删掉这三行动画里除 `typing` 以外的两条，并把 `border-right` 设为 `transparent`。
- 备案号：拿到真实备案号后，把 HTML 末尾注释里的 `<footer>` 放回 `</main>` 之后即可，样式已保留；记得替换 `京ICP备XXXXXXXX号-1`。
- 减少动态效果：系统开启「减弱动态效果」时直接显示 `Jiang`，不播放打字动画。

## 部署

仓库 `JIANG-R98.github.io` 是 GitHub Pages 用户主页仓库，从 `main` 分支根目录发布。推送后自动构建：

```bash
git add index.html README.md
git commit -m "简化页面"
git push
```

线上地址：<https://jiang-r98.github.io/>。

如果部署到国内服务器，只需要把 `index.html` 放到 Nginx 静态目录；这个页面没有构建步骤，也没有 JavaScript 依赖。
