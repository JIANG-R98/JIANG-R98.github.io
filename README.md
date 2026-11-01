# 江畔小记

Jiang 的个人社媒介绍页：整页只有居中的 `Jiang`（打字机效果）、一句中文简介和一个社交入口。白底黑字、等宽字体，无构建步骤、无 JavaScript 依赖。备案号暂不展示。

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

## 备案相关

- 页面标题、可见的站名、页脚版权名目前统一为 `江畔小记`，对应备案的「网站名称」。备案名称不能是纯英文、纯数字、姓名或域名，必须是三个以上汉字；提交前按身份证所在省的管局规则再确认一次，避免含当地禁用词。
- 页面内容是个人简介与社交账号入口，不含商业、交易、论坛、评论功能，备案时服务内容按接入商提示选择「个人主页 / 其他」，备注「个人非经营性网站」。
- 备案号未下发前不展示，HTML 末尾保留了注释和样式；拿到后把 `京ICP备XXXXXXXX号-1` 那一行放回 `<footer>` 即可，链接保持 `https://beian.miit.gov.cn/`。
- 备案期间域名不要解析到大陆服务器；通过后再切换解析，并移除 GitHub Pages 的自定义域名，避免两边冲突。

## 修改

- 站名：改三处——`<title>`、`.site-name` 里的 `江畔小记`、页脚版权 `© 2026 江畔小记`。
- 首屏名字：改 `<span class="type">Jiang</span>`，同时把 `h1` 的 `width: 5ch`、`@keyframes typing` 的 `width: 5ch` 和 `steps(5, end)` 改成新名字的字符数。
- 简介：改 `.bio` 那一段文字。
- 社交入口：在 `.links` 里按现有 `<a>` 格式追加，例如微博、小红书、邮箱；链接已注释在 HTML 里，替换成自己的主页地址即可。
- 打字速度：调整 `.type` 里 `typing` 动画的 `0.75s`。
- 光标：由 `.type` 的 `border-right` 模拟，`caret-blink` 控制闪烁两次，`caret-off` 控制结束后淡出；不想要光标就删掉除 `typing` 以外的两条动画，并把 `border-right` 设为 `transparent`。
- 减少动态效果：系统开启「减弱动态效果」时直接显示 `Jiang`，不播放打字动画。

## 部署

仓库 `JIANG-R98.github.io` 是 GitHub Pages 用户主页仓库，从 `main` 分支根目录发布。推送后自动构建：

```bash
git add index.html README.md
git commit -m "改为个人社媒介绍页"
git push
```

线上地址：<https://jiang-r98.github.io/>。

如果部署到国内服务器，只需要把 `index.html` 放到 Nginx 静态目录；这个页面没有构建步骤，也没有 JavaScript 依赖。
