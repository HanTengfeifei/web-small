import hudClass from "./hud/hud";
import utils from './utils/index';

//实例API接口url文件
var apiUrl = require('./libs/ConstantConfig.js')
//实例请求接口文件
var network = require('./libs/network.js')

//var Paho = require('/utils/paho-mqtt.js')
var windowWidth = 0;
var windowHeight = 0;
var timer; // 计时器
var token;
var carId;//运行中的出车单
wx.getSystemInfo({
  success: function (res) {
    windowWidth = res.windowWidth;
    windowHeight = res.windowHeight;
  }
})
//app.js
App({
  onLaunch: function () {
    this.utils = new utils();
    // 展示本地存储能力
    token = wx.getStorageSync('tokenId');
    carId = wx.getStorageSync('carId');
    if(token != "") {
      this.globalData.tokenId = token;
      wx.reLaunch({
        url: '../pages/index/index',
      })
    } else {
      wx.navigateTo({
        url:'../pages/login/login'
      })
    }
    if(carId != "") {
      wx.getLocation({
        type: "gcj02",
        success: function (res) {
          var params = new Object();
          params.tokenId = token;
          params.lon = res.longitude;
          params.lat = res.latitude;
          params.id = carId;
          params.flag = "0";
          const requestTask = network.POST({
            url: apiUrl.URL_gps_Interval,
            params: params,
            success: function (res) {
              // success  
              if (res.data.code == 1) {

              }
            }
          })
        },
      });
      Countdown();
    }
  },

  hudClass: (s) => new hudClass(s),
  globalData: {
    tokenId: null,
    windowWidth: windowWidth,
    windowHeight: windowHeight
  }
})

function Countdown() {
  timer = setTimeout(function () {
    wx.getLocation({
      type:"gcj02",
      success: function(res) {
        var params = new Object();
        params.tokenId = token;
        params.lon = res.longitude;
        params.lat = res.latitude;
        params.id = carId;
        params.flag = "0";
        const requestTask = network.POST({
          url: apiUrl.URL_gps_Interval,
          params: params,
          success: function (res) {
            // success  
            if (res.data.code == 1) {
            }
          }
        })
      },
    })
    Countdown();
  }, 600000);
};