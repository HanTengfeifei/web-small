//实例API接口url文件
var apiUrl = require('../../libs/ConstantConfig.js')
//实例请求接口文件
var network = require('../../libs/network.js')
//类型转换js接口
var typeConversion = require('../../libs/typeConversion.js')
var util = require('../../utils/util.js');
var _this;
//获取应用实例
var app = getApp()

var countdown = 60;
var settime = function () {
  if (countdown == 0) {
    _this.setData({
      isDisabled: false,
      btnText: "验证码"
    })
    countdown = 60;
    return;
  } else {
    _this.setData({
      isDisabled: true,
      btnText:  countdown + "s"
    })
    countdown--;
  }
  setTimeout(function () {
    settime()
  }, 1000)
}

Page({
  data: {
    phoneFlag:0,
    passFlag:0,
    phone: '',
    code: '',
    isDisabled: false,
    btnText: "获取验证码"
  },

  onLoad:function(){
    _this = this;
    _this.hud = app.hudClass(this).hud;
    this.setData({
      isDisabled: false,
      btnText: "验证码"
    })
  },

  // 获取输入账号  
  phoneInput: function (e) {
    if (e.detail.value.length > 0){
      this.setData({
        phoneFlag: 1
      })
    } else {
      this.setData({
        phoneFlag: 0
      })
    }
    this.setData({
      phone: e.detail.value
    })
  },

  // 获取输入验证码  
  codeInput: function (e) {
    if (e.detail.value.length > 0){
      this.setData({
        passFlag: 1
      })
    } else {
      this.setData({
        passFlag: 0
      })
    }
    this.data.code = e.detail.value;
  },
  /**
   * 清除手机号输入
   */
  clearAway:function(){
    this.setData({
      phone:"",
      phoneFlag: 0
    })
  },

  /**
     * 获取验证码
    */
  codeTap: function (sender) {
    if (_this.data.phone.length != 11) {
      _this.hud.showError("手机号码不正确");
      return;
    }
    //按钮开始倒计时
    settime();
    if (util.isSubmitPhoneNumber(this.data.phone)) {
      var params = new Object();
      params.phone = _this.data.phone;
      const requestTask = network.POST({
        url: apiUrl.URL_user_sms_send,
        params: params,
        success: function (res) {
          // success  
          if (res.data.code == 1) {
            _this.hud.showSuccess("验证码已发送");
          } else {
            _this.hud.showError(res.data.msg);
          }
        },
        fail: function () {
          // fail  
          _this.hud.showError("网络异常");
        },
      })
    }
  },

  // 登录  
  login:function() {
    if (_this.data.phone.length == 0 ) {
      _this.hud.showWarn("请输入手机号")
    } else if (_this.data.code.length == 0){
      _this.hud.showWarn("请输入验证码")
    } else {
      var params = new Object();
      params.phone = this.data.phone;
      params.code = this.data.code;
      _this.hud.show("登录中...");
      const requestTask = network.POST({
        url: apiUrl.URL_user_login,
        params: params,
        success: function (res) {
          _this.hud.hide();
          // success  
          if (res.data.code == 1) {
            wx.setStorage({
              key:"tokenId",
              data:res.data.data.tokenId
            })
            app.globalData.tokenId = res.data.data.tokenId;
            if (getCurrentPages.length == 0) {
              wx.redirectTo({
                url: '../index/index',
              });
            } else {
              wx.navigateBack({
                delta:1
              });
            }
          } else {
            _this.hud.showError(res.data.msg);
          }
        },
        fail: function () {
          _this.hud.showError("网络异常");
        },
      })
    }
  },
})  