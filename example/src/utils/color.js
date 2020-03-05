export const HexToRGBA = (_color, _opacity) => {
  var sColor = _color.toLowerCase();
  //十六进制颜色值的正则表达式
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  // 如果是16进制颜色
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      var sColorNew = '#';
      for (var i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
      }
      sColor = sColorNew;
    }
    //处理六位的颜色值
    var sColorChange = [];
    for (var i = 1; i < 7; i += 2) {
      sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2)));
    }
    return 'rgba(' + sColorChange.join(',') + ',' + _opacity + ')';
  }
  return sColor;
};


//hex颜色转rgb颜色
export const HexToRgb = (str) => {
  var r = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  //test方法检查在字符串中是否存在一个模式，如果存在则返回true，否则返回false
  console.log(str, r.test(str), '121');
  if (!r.test(str)) return window.alert('输入错误的hex');
  //replace替换查找的到的字符串
  str = str.replace('#', '');
  //match得到查询数组
  var hxs = str.match(/../g);
  //alert('bf:'+hxs)
  for (var i = 0; i < 3; i++) hxs[i] = parseInt(hxs[i], 16);
  //alert(parseInt(80, 16))
  //console.log(hxs);
  return hxs;
};

//GRB颜色转Hex颜色
export const RgbToHex = (a, b, c) => {
  var r = /^\d{1,3}$/;
  if (!r.test(a) || !r.test(b) || !r.test(c)) return window.alert('输入错误的rgb颜色值');
  var hexs = [a.toString(16), b.toString(16), c.toString(16)];
  for (var i = 0; i < 3; i++) if (hexs[i].length == 1) hexs[i] = '0' + hexs[i];
  return '#' + hexs.join('');
};
  
//得到hex颜色值为color的加深颜色值，level为加深的程度，限0-1之间
export const getDarkColor = (color, level) => {
  var r = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  if (!r.test(color)) return window.alert('输入错误的hex颜色值');
  var rgbc = this.HexToRgb(color);
  //floor 向下取整
  for (var i = 0; i < 3; i++) rgbc[i] = Math.floor(rgbc[i] * (1 - level));
  return this.RgbToHex(rgbc[0], rgbc[1], rgbc[2]);
};

//得到hex颜色值为color的减淡颜色值，level为加深的程度，限0-1之间
export const getLightColor = (color, level) => {
  var r = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  if (!r.test(color)) return window.alert('输入错误的hex颜色值');
  var rgbc = this.HexToRgb(color);
  for (var i = 0; i < 3; i++) rgbc[i] = Math.floor((255 - rgbc[i]) * level + rgbc[i]);
  return this.RgbToHex(rgbc[0], rgbc[1], rgbc[2]);
};