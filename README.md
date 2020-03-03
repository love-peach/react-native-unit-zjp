
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

## 组件使用说明

### Button

按钮组件，依赖插件 `react-native-linear-gradient` 来实现渐变效果

**代码示例**

```html
<Button type="primary">primary</Button>

<Button gradient gradientColors={['#f00', '#0f0']}>渐变</Button>
```

**API**

属性 | 说明 |  类型 | 默认值
- | - | - | -
type | 按钮类型，可选值为 `default`、`primary`、`info`、`warning`、`success`、`error`、`gray`、`golden`、`text` | String | default
size | 按钮大小，可选值为 `xs`、`sm`、`md`、`lg`、`xl` | String | lg
shape | 按钮形状，可选值为 `rect`、`radius`、`circle` | String | circle
borderRadius | 圆角大小, 当 `shape` 为 `radius` 时，可通过此属性控制圆角大小 | Number | -
color | 设置按钮文字颜色 | String | -
backgroundColor | 设置按钮背景颜色 | String | -
ghost | 设置幽灵按钮 | Boolean | false
outlineType | 设置按钮边框类型，可选值为 `solid`、`dotted`、`dashed` | String | solid
outlineColor | 设置按钮边框颜色 | String | -
outlineWidth | 设置按钮边框粗细 | String | -
gradient | 设置渐变按钮 | Boolean | false
gradientColors | 设置渐变颜色 | Array | [info, primary]
gradientDirection | 设置渐变方向 | String | horizontal
gradientProps | 设置渐变其他属性。因为渐变是通过插件 `react-native-linear-gradient` 实现的 | Object | -
loading | 设置按钮为加载中状态 | Boolean | false
disabled | 设置按钮为禁用状态 | Boolean | false
icon | 设置按钮图标 | Object \| Function \| element | -
iconStyle | 设置按钮图标样式 | Object | -
iconOnRight | 设置按钮图标位置在右边 | Boolean | false
activityIndicatorColor | loading 指示器颜色 | String | 默认为文字颜色
containerStyle | 容器样式 | Object | -
clickInterval | 连续两次点击间隔 毫秒 | Numer | 1000
onPress | 点击事件 | event | -
onLongPress | 长按事件 | event | -


### ButtonGroup

按钮组 组件

**代码示例**

```html
<ButtonGroup style={styles.btnGroupWrap} size="xs">
  <Button type="primary">是</Button>
  <Button type="error">否</Button>
</ButtonGroup>
```

**API**

属性 | 说明 |  类型 | 默认值
- | - | - | -
size | 设置按钮组大小。可选值为：`xs`、`sm`、`md`、`lg`、`xl` | String | md
radius | 设置按钮组圆角大小。| Number | 1000
ghost | 设置幽灵按钮组 | Boolean | false
vertical | 设置垂直按钮组 | Boolean | false
style | 设置按钮组容器样式 | Object | -

### Cell

列表组件

```html
<Cell title="2/1期" value="420.0" label="应支付日：2019年06月21日" extra="已逾期" />

<Cell title="验证码" value={<Button size="md" shape="radius" outline type="primary" outlineColor="#f00">获取验证码</Button>} />

```

**API**

属性 | 说明 |  类型 | 默认值
- | - | - | -
title | 标题 左上角 | String \| element | -
value | 值 右上角 | String \| element | -
valuePlace | 空值 placeholder | String \| element | -
label | 说明 左下角 | String \| element | -
extra | 附加 右下角 | String \| element | -
titleStyle | 标题样式。同理，还有 `valueStyle`、 `labelStyle`、`extraStyle`、`valuePlaceStyle` | Object | -
icon | 设置图标 最左边 | Object \| Function \| element | -
iconStyle | 图标样式 | Object | -
link | 设置箭头样式 | Boolean | false
indicator | 设置指示器 最右边。预设可选值为`arrow`、`plus`当给定 `onPress` 后，默认为小箭头 | Object \| Function \| element | arrow
indicatorDirection | 指示器方向 可选值为 `up`、`down` | String | -
indicatorStyle | 指示器样式 | Object | -
splitLine | 设置底部分割线 | Boolean | -
splitLineStyle | 分割线样式 | Object | -
containerWrapStyle | 容器外层样式 包含内容 和 分割线 | Object | -
containerStyle | 容器样式 包含 icon 文字 和 指示器 | Object | -
activeOpacity | 点击透明度，同 TouchableHighlight 属性。当给定 `onPress` 后，默认为 0.5 | Number | 0.5 \| 1
underlayColor | 底色，同 TouchableHighlight 属性。当给定 `onPress` 后，默认为 #eee | String | #eee \| transparent
clickInterval | 点击间隔 毫秒 | Number | 0
onPress | 点击事件 | Function | -


### CellGroup

列表容器组件

```html
<CellGroup style={{ marginVertical: 20 }} borderOffset={0}>
  <Cell title="2/1期" value="420.0" />
  <Cell title="2/1期" value="420.0" />
  <Cell title="2/1期" value="420.0" />
  <Cell title="2/1期" value="420.0" />
</CellGroup>
```

**API**

属性 | 说明 |  类型 | 默认值
- | - | - | -
paddingOffset | 内部 cell 左右间距 | Number | 12
borderOffset | 下滑线距离左边间距 | Number | 12
style | 容器样式 | Object | -
