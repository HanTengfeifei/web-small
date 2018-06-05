// pages/noData/noData.js
var timer; // 计时器
//获取应用实例
const app = getApp()
//实例API接口url文件
var apiUrl = require('../../libs/ConstantConfig.js')
//实例请求接口文件
var network = require('../../libs/network.js')
var _this;
Page({
  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("============onLoad");
    _this = this;
    this.Countdown();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("============onReady");
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("============onShow");
    var that = this;
    var params = new Object();
    params.tokenId = app.globalData.tokenId;
    const requestTask = network.POST({
      url: apiUrl.URL_car_get,
      params: params,
      success: function (res) {
        if (res.data.code == 1) {
          wx.redirectTo({
            url: '../index/index'
          })
        } else {
        }
      },
      fail: function () {

      },
    })
  },

  Countdown: function () {
    _this = this;
    timer = setTimeout(function () {
      var that = this;
      var params = new Object();
      params.tokenId = app.globalData.tokenId;
      const requestTask = network.POST({
        url: apiUrl.URL_car_get,
        params: params,
        success: function (res) {
          if (res.data.code == 1) {
            wx.redirectTo({
              url: '../index/index'
            })
          } else {
          }
        },
        fail: function () {

        },
      })
      _this.Countdown();
    }, 60000)
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("============onHide");
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    clearTimeout(timer);
    console.log("============onUnload");
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})