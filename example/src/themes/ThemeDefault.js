const color = {
  white: '#fff',

  primary: '#3a7ae5',
  info: '#66d4f8',
  warning: '#ffd210',
  success: '#56bc44',
  error: '#eb4747',
  golden: '#b69254',

  grayDark: '#c5c8ce',
  gray: '#dcdfe5',
  grayLight: '#f7f8fa',

  bg: '#f0f3f9',

  border: '#f0f1f5',
  borderDark: '#e0e2e7',

  titleMain: '#121b33',
  title: '#394259',
  titleSub: '#868f9e',
  textPlaceholder: '#b2b6bf',
  textTip: '#cccfd9',
  textTipAlert: '#fe6666',
};

export default {
  ...color,

  // btn - background color
  btn_bg_default: color.gray,
  btn_bg_primary: color.primary,
  btn_bg_info: color.info,
  btn_bg_warning: color.warning,
  btn_bg_success: color.success,
  btn_bg_error: color.error,
  btn_bg_gray: color.grayLight,
  btn_bg_golden: color.golden,
  btn_bg_text: 'transparent',
  btn_bg_disabled: color.gray,

  // btn - text color
  btn_text_default: color.white,
  btn_text_primary: color.white,
  btn_text_info: color.white,
  btn_text_warning: color.titleMain,
  btn_text_success: color.white,
  btn_text_error: color.white,
  btn_text_gray: color.titleSub,
  btn_text_golden: color.titleMain,
  btn_text_text: color.primary,
  btn_text_disabled: color.white,

  // btn - height
  btn_height_xs: 20,
  btn_height_sm: 25,
  btn_height_md: 32,
  btn_height_lg: 40,
  btn_height_xl: 50,

  // btn - min-width
  btn_min_width_xs: 20,
  btn_min_width_sm: 25,
  btn_min_width_md: 32,
  btn_min_width_lg: 40,
  btn_min_width_xl: 50,

  // btn - font size
  btn_font_size_xs: 9,
  btn_font_size_sm: 12,
  btn_font_size_md: 13,
  btn_font_size_lg: 18,
  btn_font_size_xl: 18,

  // btn - font weight
  btn_font_weight_xs: '400',
  btn_font_weight_sm: '400',
  btn_font_weight_md: '400',
  btn_font_weight_lg: '400',
  btn_font_weight_xl: '600',

  // btn padding Horizontal
  btn_padding_horizontal_xs: 4,
  btn_padding_horizontal_sm: 4,
  btn_padding_horizontal_md: 5,
  btn_padding_horizontal_lg: 12,
  btn_padding_horizontal_xl: 18,

  // btn padding Vertical 暂时没用到
  btn_padding_vertical_xs: 2,
  btn_padding_vertical_sm: 4,
  btn_padding_vertical_md: 6,
  btn_padding_vertical_lg: 9,
  btn_padding_vertical_xl: 14,

  // btn - radius
  btn_radius_rect: 0,
  btn_radius_radius: 5,
  btn_radius_circle: 1000,

  // btn - border-width
  btn_border_width: 1,
};
