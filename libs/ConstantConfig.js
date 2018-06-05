
var BASE_URL = "http://172.16.5.197" //线下
// var BASE_URL = "http://g.zhiqi.cn" //线上
module.exports = {
  /**
 用户登录
 
 @return URL
 */
 URL_user_login: BASE_URL + "/app/user/login/v1",

/**
 发送验证码

 @return URL
 */
 URL_user_sms_send : BASE_URL + "/app/user/sendSMS/v1",


/**
 用户注销

 @return URL
 */
 URL_user_logout : BASE_URL + "/app/user/logout/v1",


/**
 重置密码

 @return URL
 */
 URL_user_resetPass : BASE_URL + "/app/user/resetPass/v1",


/**
 更改手机号

 @return URL
 */
 URL_user_changePhone : BASE_URL + "/app/user/changePhone/v1",


/**
 获取用户个人信息

 @return url
 */
 URL_user_get : BASE_URL + "/app/user/get/v1",

  /**
   上传GPS 
  
   @return
   */
 URL_gps_Interval : BASE_URL + "/app/gps/Interval/v1",

  /**
  上传磅单
 
  @return URL
  */
 URL_carBill_add: BASE_URL + "/app/carbill/add/v1",

  /**
  获取某个出车单详情
 
  @return URL
  */
 URL_car_get: BASE_URL + "/app/car/getWechat/v1",

  /**
   修改出车单状态
  
   @return URL
   */
 URL_car_setStatus: BASE_URL + "/app/car/setStatus/v1"
}