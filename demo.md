# 组件设计

## 分类

- 基础组件
  - Button
  - Cell
  - InputItem
  - SplitLine
  - Mask
  - AnimateView
  - ContainerView
- 复合组件
  - Modal = Mask + AnimateView + ContainerView
  - Toast = Mask + AnimateView + ContainerView + react-native-root-siblings
- 其他组件
  - Carousel
- 组合组件
  - ButtonGroup = Button + Button
  - ButtonRadio = ButtonGroup + Button
  - CellGroup = Cell + Cell
  - InputItemGroup = InputItem + InputItem
  - Popup = Modal + placement: bottom
  - ActionSheet = Modal + Button + SplitLine + placement: bottom
  - Dialog = Modal + Button


