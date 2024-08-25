# Website

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

### Installation

```
$ npm i
```

### Local Development

```
$ npm start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
$ npm build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

Using SSH:

```
$ USE_SSH=true yarn deploy
```

Not using SSH:

```
$ GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.

### i18n 翻译开发指南

目前默认语言是英文

- 页面相关组件翻译
  文件主要存放 `/pages/*/*.jsx/` 组件的文本信息，其中使用 `translate 和 <Translate />` 进行翻译
  翻译的`key` 都存在于 `code.json` 文件中, 所以在翻译的时候需要在 `code.json` 文件中添加对应的 key-value 信息。
  `/i18n/en/code.json` 存放英文文本， `/i18n/zh-CN/code.json` 存放中文文本

- 文档翻译
  `/i18n/zh-CN/docusaurus-plugin-content-docs/current/`
  主要存放 `/docs/*/*.mdx` 相关文件的文本信息

  如果是 updates 板块相关的信息则与上面的文件夹类似，只是路径不同，如下：

- 其它自定义板块
  `/i18n/zh-CN/docusaurus-plugin-content-updates/current/`

- 启动本地中文页面

  ```
  $ npm run start -- --locale zh-CN
  ```

  通过上面的命令可以在本地启动中文语言的网站，可以在本地直接查看页面的中文翻译效果。

- 相关方法：
  在组件中获取当前语言的值，可以使用

  ```
  const context:any = useDocusaurusContext()
  const {i18n} = context
  const currentLocale = i18n.currentLocale
  ```

  i18n 类型为 any，用此方式在组件内可获取当前语言，根据当前语言做例如替换中英图片的操作。

  相关链接：https://docusaurus.io/docs/3.1.1/docusaurus-core#translate
