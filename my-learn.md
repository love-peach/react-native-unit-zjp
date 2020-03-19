
# 搭建 RN 组件库

最近，在维护一个 `RN` 项目时，发现存在一些问题。当我们开始使用 `RN` 之前，肯定会做一些技术调研，比如技术难度、社区活跃度、同事了解程度等，其中不可忽视的是有无现成成熟的 `组件库` 使用，这将使项目开发周期和效率有所提高。

当我们做好技术选型，选定好 组件库 后，随着项目的开发和不断迭代，可能会出现这么一些问题：

1. 只使用了 组件库 中几个组件而已；
2. 组件库中的组件需要做一些修改，但是修改起来却比较麻烦；
3. 往往自定义的组件已经有十几个了;

那么这个时候，可以自定义组件，将第三方组件库替换掉，提取自己的组件发布到 `npm` 上。今天，我们就来聊聊如何搭建一个 `RN组件库项目`。主要还是学习如何开发一个组件库这么一个`过程`。过程很重要

## 提前考虑的问题

当我们决定开发一个 RN组件库 的时候，有几个问题需要提前考虑下：

1. RN组件库目录组织结构大概长啥样？
2. 如何开发、预览、验证我们写的组件？
3. 如何发布组件库？

### RN组件库目录组织结构大概长啥样

因为，我们自定义的组件基本都是纯 js 的文件，很少有涉及到原生的功能（主要是不会0-0）。

因此，我们的目录组织结构，只需要有个 `components` 文件夹、一个入口文件`index.js`（将组件统一导出）、一个`package.json`文件，就可以了。当然，如果你有 `icon` `assets` 或者一些其他的目录也能添加进来。

这里需要多说一点，我们只用关心最终上传 npm 的目录，而不用关心与预览相关的目录结构。比如 有两种方式，一种是当做一个RN项目开发，通过 `npx react-native init xxx`来初始化项目。一种是 [expo](https://expo.io/learn)，不用搭建 RN 环境。

我用的是第一种，所以 我的目录大致如下：

```sh
.
├── README.md
├── app.json
├── android/
├── ios/
├── gulpfile.js
├── index.js
├── package.json
├── dist
│   ├── README.MD
│   ├── index.js
│   ├── package.json
│   └── src
│       ├── components
│       ├── icons
│       ├── themes
│       └── utils
└── src
    ├── App.js
    ├── component-path
    ├── components
    ├── icons
    ├── routes
    ├── themes
    ├── utils
    └── views
```

`dist` 目录 就是我最终用来发布 `npm` 的目录。`dist/components` 下的组件，是从 `src/components` 拷贝而来，其他类似目录，同理。至于其他文件和目录怎么来的，我后面会讲到。

### 如何开发、预览、验证我们写的组件

在开发组件的过程中，需要实时预览组件的效果，那么组件在预览页面的引入方式可能是这样的：

```js
// 预览页面可能位于 src/views/ButtonDemo.js
import { Button } from '../components'
```

组件开发完，发布后，想要看线上组件的实际效果，引入可能会变成这样：

```js
import { Button } from 'react-native-unit-zjp'
```

如果，你开发了有一些组件，有一些预览页面，那么，你在开发过程 和 发布后，为了预览组件，可能需要频繁修改组件路径。而且，还有一个问题，就是在开发完组件，预发布的时候，无法提前预览即将发到线上的组件效果。（我碰到过一个问题，就是本地开发，引入组件看效果的时候，没有任何问题；发布到线上，引入的时候，会报警告）

其实，我们可以有一个统一修改组件引入路径的地方，解决这些问题。

在 `src/component-path` 下 添加 `index.js` 文件：

```js
import * as components from '../components'; // 本地调试
// import * as components from '../../dist'; // 发布前测试包
// import * as components from '../../node_modules/react-native-unit-zjp'; // 正式依赖的包。
/*
这里之所以 要加 '../../node_modules'，是因为当 dist 目录下 的 package.json 存在时，
直接从 ’react-native-unit-zjp‘ 引入组件，会指向 dist 目录。
从这点可以得出，如果想要以特定名称引入某文件时，不想写长长的路径的话，可以在该目录下，新建一个pacakage.json 然后指定它的 name 就可以了。
*/

module.exports = {
  Theme: components.Theme || require('../themes/Theme'),
  ...components
};
```

### 如何发布组件库

基于上面的思考，我们的发布应该有一下这样的流程：

1. 提交代码至 `git`，然后 `gulp` 拷贝相关目录 到 `dist`
2. cd `dist`
3. npm version xxx
4. npm publish

解决这三个问题后，我们可以开始创建项目了。

## 创建 RN组件库项目

上面提到过，我们只关心用于发布的 `dist` 目录，因此，怎么创建项目，就看个人喜好。如果有现成 RN 开发环境，可以直接初始化一个 RN 项目。如果不想费力搭建 RN 开发环境，可以试试 [expo](https://expo.io/learn)。这里，我就用第一种了。

### 1、初始化 react-native 项目

```sh
npx react-native init xxx
```

### 2、开发组件

在 `src/components` 目录下开发你的组件。怎么开发组件，这里就不讲了，就当是一个 rn 项目来开发，该建啥目录，缺啥引啥，router 啥的。

在 `src/components` 最好有个 导出组件的文件 `index.js`:

```js
import Button from './Button/Button.js';

export { Button }
```

### 3、添加发布文件夹 dist

为了目录清晰，以及有个 单独的 package.json 管理 发布包的版本，因此，决定单独弄个 `dist` 文件夹。将需要发布的文件及目录拷贝至 `dist` 目录中。

在 `dist` 目录 添加 `package.json`。

```json
{
  "name": "react-native-unit-zjp",
  "version": "0.0.4",
  "description": "## 一套拿来就用的 ReactNative 组件库",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [
    "react-native"
  ],
  "author": "zhangjinpei",
  "license": "ISC",
  "dependencies": {
    "react-native-linear-gradient": "^2.5.6",
    "react-native-root-siblings": "^4.0.6"
  },
  "directories": {
    "example": "example"
  },
  "devDependencies": {},
  "repository": {
    "type": "git",
    "url": "xxx"
  },
  "bugs": {
    "url": "xxx"
  },
  "homepage": "xxx",
  "files": [
    "index.js",
    "README.md",
    "src"
  ]
}
```

### 4、拷贝组件到 dist/src 下

为了保持他们之间的引用路径，保持 `dist` 目录结构，跟 `src` 目录相似。

为了方便，这里通过 `gulp` 拷贝文件。

配置如下：

```js
const gulp = require('gulp');
const rimraf = require('rimraf');
const { src, dest, task, series} = gulp;

task('clean', (cb) => {
  rimraf('dist/src', cb);
});

task('components', () => {
  return src('src/components/**/*.*')
    .pipe(dest('dist/src/components/'));
});

task('icons', () => {
  return src('src/icons/**/*.*')
    .pipe(dest('dist/src/icons/'));
});

task('themes', () => {
  return src('src/themes/**/*.*')
    .pipe(dest('dist/src/themes/'));
});

task('utils', () => {
  return src('src/utils/**/*.*')
    .pipe(dest('dist/src/utils/'));
});

task('readme', () => {
  return src('./README.md')
    .pipe(dest('dist/'));
});

exports.default = series('clean', 'components', 'icons', 'themes', 'utils', 'readme');
```

### 5、导出组件

现在组件有了，还需要有个统一的地方导出组件。在 `dist` 目录添加入口文件，内容如下：

```js
import Theme from './src/themes/Theme'; // 这个是主题配置 如不需要 可以去掉
import * as myUnit from './src/components';

module.exports = {
  Theme,
  ...myUnit
};
```

那么这个时候，组件库的架子基本就差不多了。这是我的项目 [react-native-unit-zjp](https://github.com/love-peach/react-native-unit-zjp)，欢迎提出问题，并 star。

## 其他问题

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

### package.json 属性概览

`package.json` 俗称 依赖配置文件（我自己取的名），最主要的作用就是，管理项目中所用到的依赖。它本身的作用是为 node.js 模块服务的，模块有很多属性，为了描述模块的特性，`package.json` 也被称作模块的 `描述文件`。

#### name version

`name` 和 `version` 是 `package.json` 中最重要的两个属性，而且是必填的。这两个属性一起就形成了 npm 模块唯一标识符。分别表示 模块的 名称 和 版本。名称一般不会变，版本会随着模块的修改而更新变动。

#### description keywords

这两个字段都是用来在npm官网上搜索的, 区别是一个是字符串, 一个是字符串数组。

#### dependencies devDependencies

这两个属性，都是用来记录项目中所用到的依赖。区别是，一个是用来记录开发环境所用的依赖，一个是记录生产环境所用到的依赖。

比如，对于大多数前端项目来说，gulp 等构件工具及插件，可能只在开发环境中使用，而在生产环境只关心最终生成的 dist 文件，所以，gulp 等插件 就应该放在devDependencies 下。

通过 `npm i xxx -save` `npm i xxx -s` `yarn add xxx -S` 安装的依赖会添加到 dependencies 下；

通过 `npm i xxx -save-dev` `npm i xxx -d` `yarn add xxx -D` 安装的依赖会添加到 devDependencies 下；

#### peerDependencies

可以让宿主环境拥有某个特定版本的依赖

[探讨npm依赖管理之peerDependencies](https://www.cnblogs.com/wonyun/p/9692476.html)

前提：`项目X` 依赖 `模块A`, `模块A` 依赖 `模块B`

情况一：如果 `模块B` 定义在 `模块A` 的 `dependencies` 字段中

结果：`模块B` 只能被 `模块A 引用`；

可能的好处：假如 项目X 也依赖 模块B，版本不一样，则可以互不干扰。

可能的坏处：假如 项目X 也依赖 模块B，且版本一样，则会有两个一模一样的 模块B

```sh
项目X
└──node_modules/
   └── 模块A
       └──node_modules/
          └── 模块B
```

情况二：如果 `模块B` 定义在 `模块A` 的 `peerDependencies` 字段中

结果：`项目X` 也会下载 或 检查 `模块b` 的版本。

可能的好处：假如 项目X 也依赖 模块B，版本不一样，则会在控制台以警告的形式提示版本问题。

可能的坏处：假如 项目X 也依赖 模块B，且版本一样，只用下载一遍。

```sh
项目X
└──node_modules/
   ├── 模块a
   └── 模块b

```

结论：定义在 `peerDependencies` 中的依赖，在宿主环境中，也会被下载 或 检查版本。

#### files

`files` 是一个包含项目中的文件的数组。如果命名了一个文件夹，那也会包含文件夹中的文件。（除非被其他条件忽略了 .npmignore .gitignore）

在 `npm publish` 的时候，会依据这个配置 上传你的文件。

#### scripts

`scripts` 是一个由脚本命令组成的 kye value 对象。

## 问题

### 1、TextInput multiline 为 true，也就是 textarea 时，上下对齐兼容问题

我们使用 `TextInput` 时，一般会让 lable input 水平居中。但，当 `TextInput` 表现为 `textarea` 时候，我们发现，输入框的文字也是是水平居中的。

可以通过设置 `textAlignVertical: top` 样式解决。
