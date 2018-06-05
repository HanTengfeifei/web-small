const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
/** 
 * 时间戳转化为年 月 日 时 分 秒 
 * number: 传入时间戳 
 * format：返回格式，支持自定义，但参数必须与formateArr里保持一致 
*/
function formatTime(number, format) {

  var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
  var returnArr = [];

  var date = new Date(number);
  returnArr.push(date.getFullYear());
  returnArr.push(formatNumber(date.getMonth() + 1));
  returnArr.push(formatNumber(date.getDate()));

  returnArr.push(formatNumber(date.getHours()));
  returnArr.push(formatNumber(date.getMinutes()));
  returnArr.push(formatNumber(date.getSeconds()));

  for (var i in returnArr) {
    format = format.replace(formateArr[i], returnArr[i]);
  }
  return format;
}

/**
  * 手机号格式验证
*/
function isSubmitPhoneNumber(mobile) {
  if (mobile.length == 0) {
    wx.showToast({
      icon: "none",
      image: "../images/error.png",
      title: '请输入手机号！',
      duration: 1500
    })
    return false;
  }
  if (mobile.length != 11) {
    wx.showToast({
      icon: "none",
      image: "../images/error.png",
      title: '号码格式不正确！',
      duration: 1500
    })
    return false;
  }
  var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
  if (!myreg.test(mobile)) {
    wx.showToast({
      icon: "none",
      image: "../images/error.png",
      title: '号码格式不正确！',
      icon: 'success',
      duration: 1500
    })
    return false;
  }
  return true;
}

module.exports = {
  formatTime: formatTime,
  isSubmitPhoneNumber: isSubmitPhoneNumber
}
