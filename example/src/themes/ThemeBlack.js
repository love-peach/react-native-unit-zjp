const color = {
  white: '#fff',

  primary: '#22353c',
  info: '#dea26c',
  warning: '#6f4837',
  success: '#3d272a',
  error: '#05080d',
  golden: '#a26e49',

  grayDark: '#c5c8ce',
  gray: '#dcdfe5',
  grayLight: '#f7f8fa',

  bg: '#f0f3f9',

  border: '#f0f1f5',
  borderDark: '#e0e2e7'
};

const textColor = {
  titleMain: '#121b33',
  title: '#394259',
  titleSub: '#868f9e',
  placeholder: '#b2b6bf',
  tip: '#cccfd9',
  tipAlert: '#fe6666',
};

export default {
  color,
  textColor,
  btn: {
    bg: {
      default: color.gray,
      primary: color.primary,
      info: color.info,
      warning: color.warning,
      success: color.success,
      error: color.error,
      gray: color.grayLight,
      golden: color.golden,
      text: 'transparent',
      disabled: color.gray,
    },
    text: {
      default: color.white,
      primary: color.white,
      info: color.white,
      warning: textColor.titleMain,
      success: color.white,
      error: color.white,
      gray: textColor.titleSub,
      golden: textColor.titleMain,
      text: color.primary,
      disabled: color.white,
    },
    fontSize: {
      xs: 9,
      sm: 12,
      md: 14,
      lg: 18,
      xl: 18,
    },
    radius: {
      rect: 0,
      radius: 2,
      circle: 1000,
    },
    height: {
      xs: 20,
      sm: 25,
      md: 32,
      lg: 40,
      xl: 50,
    },
    minWidth: {
      xs: 20,
      sm: 25,
      md: 32,
      lg: 40,
      xl: 50,
    },
    paddingHorizontal: {
      xs: 4,
      sm: 4,
      md: 5,
      lg: 12,
      xl: 18,
    },
    paddingVertical: {
      xs: 2,
      sm: 4,
      md: 6,
      lg: 9,
      xl: 14,
    },
    borderWidth: 1,
    btnBorderColor: '#C9CDD5',
  },
};
