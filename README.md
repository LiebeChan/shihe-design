# 室合设计 | 适合即合适

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/LiebeChan/shihe-design)
# 室合设计网站部署指南

## 方式一：Vercel 一键部署（推荐）

1. 访问 https://vercel.com
2. 用 GitHub 账号登录
3. 点击 "Add New Project"
4. 选择 "Import from GitHub" 或直接把项目文件夹拖入
5. 部署完成后，会获得一个 `xxx.vercel.app` 链接
6. 在域名设置里添加 `yn-ny.com`

## 方式二：我帮你部署（需要 Vercel Token）

如果你给我 Vercel 的 API Token，我可以直接帮你部署。

获取方式：
1. 登录 https://vercel.com/account/tokens
2. 点击 "Create Token"
3. 复制 token 发给我

## DNS 配置（部署后）

阿里云域名解析修改：
- 记录类型：CNAME
- 主机记录：www
- 记录值：cname.vercel-dns.com
- TTL：600

## 当前项目位置

`C:\Users\yuyuchen\workspace\shihe-site`

包含文件：
- index.html（首页）
- style.css（样式）
- 4.html, 5.html...（案例详情页）
