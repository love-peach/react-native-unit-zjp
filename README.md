
# react-native-unit-zjp

学习 npm ，记录开发 RN 组件库的过程。

## 备忘录

### npm 版本维护

当我们开发好组件，或者是开发中时，需要将包提交到 npm 上，需要有个版本号，记录更改。

版本号，一般使用三位数来描述，以点来分割，例如：`1.0.0`

- 主版本号：当你做了不兼容的 API 修改
- 次版本号：当你做了向下兼容的功能性新增
- 修订号：当你做了向下兼容的问题修正

通过执行，`npm version xxx` 来自动更新版本号。（需要将改动提交至 git ，然后再执行此命令。此命令，会自动打上 tag，并提交，需要手动 git push ）

- patch 1.0.0 => 1.0.1
- minor 1.0.0 => 1.1.0
- major 1.0.0 => 2.0.0

版本号更新好之后，就可以 `npm publish` 了。

**注意：** 首次 `publish` 只要有个版本号就可以，再次 `publish` 之前，必须更新版本号，也就是执行 `npm version xxx` 命令，否者会报错：
`You cannot publish over the previously published versions: x.x.x`;
