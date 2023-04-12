> 简单的前端工程脚手架项目

## 安装

```shell
npm install yan-temp-cli -g
// or
yarn add yan-temp-cli -g
// or
cnpm install yan-temp-cli -g
```

## 注意事项
1. 首次使用请手动指定您的模板仓库地址，否则采用默认地址，地址规则参见[download-git-repo](https://www.npmjs.com/package/download-git-repo) 文档，推荐使用direct模式
2. 偶尔由于网络原因会出现 'git clone' failed with status 128 错误，重新多次执行命令可解决,多次执行无效联系作者。
3. 若npm install提示 与read-pkg包相关报错 Error: EPERM: operation not permitted, rename，请以管理员身份运行cmd。或者以管理员身份打开vscode，在terminal中执行npm install 命令。

## 快速开始
```shell
# 查看全部指令
yan --help 
```

## LICENSE

[MIT](LICENSE)
