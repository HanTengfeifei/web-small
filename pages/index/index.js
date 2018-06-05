//index.js
//获取应用实例
const app = getApp()
//实例API接口url文件
var apiUrl = require('../../libs/ConstantConfig.js')
//实例请求接口文件
var network = require('../../libs/network.js')
var util = require('../../utils/util.js')

var _this;
Page({
  data: {
    files:"",
    fileArr:[],//预览图片时使用
    zhuangChe:false,//控制填写装车磅单区域显示or隐藏
    xieChe: false,//控制填写卸车磅单区域显示or隐藏
    phoneName:"",//控制不同状态下第一个联系人是谁
    openView:true,//控制展开关闭
    showBtn:false,//控制底部按钮显示哪个
    btnText:"",//底部按钮名称
    firstShow:true,//顶部按钮默认都不显示
    model:{},
    sendNum:"",
    recvNum:"",
    processData: [
      {
        name: '接单',
        start: '#fff',
        end: '#aaa',
        icon: '../images/process1.png',
        image:'',
        color:'#fff',
        opacity:0.4
      },
      {
        name: '装车',
        start: '#aaa',
        end: '#aaa',
        icon: '../images/process1.png',
        image: '',
        color: '#fff',
        opacity: 0.4
      },
      {
        name: '卸车',
        start: '#aaa',
        end: '#fff',
        icon: '../images/process1.png',
        image: '',
        color: '#fff',
        opacity: 0.4
      }
    ],
    open:false
  },
  /**
 * 生命周期函数--监听页面初次渲染完成
 */
  onReady: function () {
    console.log("===========onReady")
    //获得easyModal
    // this.easyModal = this.selectComponent("#easyModal");
    // this.easyModalSecond = this.selectComponent("#easyModalSecond");
    // this.easyModalThird = this.selectComponent("#easyModalThird");

  },

  onLoad: function () {
    _this = this;
    _this.hud = app.hudClass(this).hud;
    _this.getCarData();
    console.log("===========onLoad")
  },
  onShow:function () {
    console.log("===========onShow")
  },
  /**
 * 页面相关事件处理函数--监听用户下拉动作
 */
  onPullDownRefresh: function () {
    _this.getCarData();
    wx.stopPullDownRefresh();
  },
  //设置流程进度
  setPeocessIcon: function (e) {
    var processArr = this.data.processData;
    if("0" == e) {
      //待接单
      processArr[0].icon = "../images/process2.png"
      processArr[0].end = "#aaa"
      processArr[0].start = "#fff"
      processArr[0].image = '../images/newTwoVersion/callout.png'
      processArr[0].color = '#fff',
      processArr[0].opacity = 1

      processArr[1].icon = "../images/process1.png"
      processArr[1].end = "#aaa"
      processArr[1].start = "#aaa"
      processArr[1].image = ''
      processArr[1].color = '#000',
      processArr[1].opacity = 0.4

      processArr[2].icon = "../images/process1.png"
      processArr[2].end = "#fff"
      processArr[2].start = "#aaa"
      processArr[2].image = ''
      processArr[2].color = '#000',
      processArr[2].opacity = 0.4
      
    } else if("1" == e || "2" == e || "3" == e) {
      //已出车
      processArr[0].icon = "../images/process3.png"
      processArr[0].end = "#2783F9"
      processArr[0].start = "#fff"
      processArr[0].image = ''
      processArr[0].color = '#000',
      processArr[0].opacity = 0.4

      processArr[1].icon = "../images/process2.png"
      processArr[1].end = "#aaa"
      processArr[1].start = "#2783F9"
      processArr[1].image = '../images/newTwoVersion/callout.png'
      processArr[1].color = '#fff',
      processArr[1].opacity = 1

      processArr[2].icon = "../images/process1.png"
      processArr[2].end = "#fff"
      processArr[2].start = "#aaa"
      processArr[2].image = ''
      processArr[2].color = '#000',
      processArr[2].opacity = 0.4
    }  else if ("4" == e || "5" == e) {
      //待卸车
      processArr[0].icon = "../images/process3.png"
      processArr[0].end = "#2783F9"
      processArr[0].start = "#fff"
      processArr[0].image = ''
      processArr[0].color = '#000',
      processArr[0].opacity = 0.4

      processArr[1].icon = "../images/process3.png"
      processArr[1].end = "#2783F9"
      processArr[1].start = "#2783F9"
      processArr[1].image = ''
      processArr[1].color = '#000',
      processArr[1].opacity = 0.4

      processArr[2].icon = "../images/process2.png"
      processArr[2].end = "#fff"
      processArr[2].start = "#2783F9"
      processArr[2].image = '../images/newTwoVersion/callout.png'
      processArr[2].color = '#fff',
      processArr[2].opacity = 1
    } else {
      processArr[0].icon = "../images/process3.png"
      processArr[0].end = "#aaa"
      processArr[0].start = "#fff"

      processArr[1].icon = "../images/process3.png"
      processArr[1].end = "#aaa"
      processArr[1].start = "#aaa"

      processArr[3].icon = "../images/process3.png"
      processArr[3].end = "#fff"
      processArr[3].start = "#aaa"
    }
    _this.setData({
      processData: processArr,
      model: _this.data.model
    })
  },
 /**
  * 详细信息展开或关闭
 */
  kindToggle: function (e) {
        open = !open
    this.setData({
      open: open
    });
  },
  /**
   * 选择上传图片
  */
  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          files: res.tempFilePaths[0]
        });
        _this.data.fileArr = res.tempFilePaths;
        _this.data.files = res.tempFilePaths[0];
      }
    })
  },
  /**
   * 获取出车单详情
  */
  getCarData:function() {
    var that = this;
    var params = new Object();
    params.tokenId = app.globalData.tokenId;
    _this.hud.show("加载中...");
    const requestTask = network.POST({
      url: apiUrl.URL_car_get,
      params: params,
      success: function (res) {
       _this.hud.hide();
        if (res.data.code == 1) {
          that.data.model = res.data.data;
          that.data.model.sendDate = that.data.model.sendDate == null ? 0 : util.formatTime(parseFloat(that.data.model.sendDate)*1000, "Y-M-D");
          that.data.model.recvDate = that.data.model.recvDate == null ? 0 : util.formatTime(parseFloat(that.data.model.recvDate)*1000, "Y-M-D");
          that.setPeocessIcon(res.data.data.status);
          // if (res.data.data.status)
          _this.pageShowControl(parseInt(res.data.data.status));
        } else if(res.data.code == 0) {
          //显示展示木有出车单页面
          wx.redirectTo({
            url: '../noData/noData'
          })
        } else {
          _this.hud.showError(res.data.msg);
        }
      },
      fail: function () {
        _this.hud.showError("网络异常");
      },
    })
  },
  /**
   * 控制展开和关闭出车单详情
  */
  openViewTap:function(){
    _this.setData({
      openView:!_this.data.openView
    })
  },
  callPhone:function(e) {
    console.log(e);
    if (e.currentTarget.id == "phone1"){
      if (e.currentTarget.dataset.phonename == "调度") {
        wx.makePhoneCall({
          phoneNumber: _this.data.model.diaodu_mobile
        })
      } else if (e.currentTarget.dataset.phonename == "装车点") {
        wx.makePhoneCall({
          phoneNumber: _this.data.model.sendMobile
        })
      } else if (e.currentTarget.dataset.phonename == "卸车点") {
        wx.makePhoneCall({
          phoneNumber: _this.data.model.receiveMobile
        })
      }
    } else if (e.currentTarget.id == "phone2"){
      wx.makePhoneCall({
        phoneNumber: _this.data.model.sendMobile
      })
    } else if (e.currentTarget.id == "phone3") {
      wx.makePhoneCall({
        phoneNumber: _this.data.model.diaodu_mobile
      })
    } else if (e.currentTarget.id == "phone4") {
      wx.makePhoneCall({
        phoneNumber: _this.data.model.receiveMobile
      })
    }
  },
  /**
   * 不同出车单状态下页面展示内容
  */
  pageShowControl:function(status) {
      if (status == 0) {
        _this.setData({
          zhuangChe:false,
          xieChe:false,
          phoneName:"调度",
          showBtn:false,
          firstShow:false,
          files:""
        });
      } else if (status >= 1 && status <= 3) {
        _this.setData({
          zhuangChe: true,
          xieChe: false,
          phoneName: "装车点",
          showBtn: true,
          btnText:"上传装车信息",
          files: ""
        });
      } else if (status > 3 && status < 6) {
        _this.setData({
          zhuangChe: false,
          xieChe: true,
          phoneName: "卸车点",
          showBtn: true,
          btnText: "上传卸车信息",
          files: ""
        });
      } else {
        _this.setData({
          zhuangChe: false,
          xieChe: false,
          phoneName: "调度",
          files: ""
        });
      }
  },

  /*
   *点击了拒绝接单
  */
  clickCancel:function() {
    var that = this;
    var params = new Object();
    params.tokenId = app.globalData.tokenId;
    params.deliverCarId = that.data.model.deliverCarId;
    params.status= "8"
    _this.hud.show("加载中...");
    const requestTask = network.POST({
      url: apiUrl.URL_car_setStatus,
      params: params,
      success: function (res) {
        _this.hud.hide();
        if (res.data.code == 1) {
          _this.hud.showSuccess("拒绝成功");
          setTimeout(function () {
            _this.getCarData();
          }.bind(this), 1500);
        } else {
          _this.hud.showError(res.data.msg);
        }
      },
      fail: function () {
        _this.hud.showError("网络异常");
      },
    })
  },



  /**
   * 点击了接单
   */
  clickOrder:function() {
    var that = this;
    var params = new Object();
    params.tokenId = app.globalData.tokenId;
    params.deliverCarId = that.data.model.deliverCarId;
    params.status = "1"
    _this.hud.show("加载中...");
    const requestTask = network.POST({
      url: apiUrl.URL_car_setStatus,
      params: params,
      success: function (res) {
        _this.hud.hide();
        if (res.data.code == 1) {
          _this.hud.showSuccess("接单成功");
          setTimeout(function () {
            _this.getCarData();
            wx.getLocation({
              type: "gcj02",
              success: function (res) {
                var params = new Object();
                params.tokenId = app.globalData.tokenId;
                params.lon = res.longitude;
                params.lat = res.latitude;
                params.id = _this.data.model.deliverCarId;
                params.flag = "1";
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
          }.bind(this), 1500);
        } else {
          _this.hud.showError(res.data.msg);
        }
      },
      fail: function () {
        _this.hud.showError("接单失败");
      },
    })
  },


  /**
   * 点击了发车
  */
  // clickDepart:function() {
  //   var that = this;
  //   var params = new Object();
  //   params.tokenId = app.globalData.tokenId;
  //   params.deliverCarId = that.data.model.deliverCarId;
  //   params.status = "2"
  //   _this.hud.show("出车中...");
  //   const requestTask = network.POST({
  //     url: apiUrl.URL_car_setStatus,
  //     params: params,
  //     success: function (res) {
  //       _this.hud.hide();
  //       if (res.data.code == 1) {
  //         _this.hud.showSuccess("出车成功");
  //         wx.setStorageSync('carId', that.data.model.deliverCarId);
  //         wx.getLocation({
  //           type: "gcj02",
  //           success: function (res) {
  //             var params = new Object();
  //             params.tokenId = app.globalData.tokenId;
  //             params.lon = res.longitude;
  //             params.lat = res.latitude;
  //             params.id = that.data.model.deliverCarId;
  //             const requestTask = network.POST({
  //               url: apiUrl.URL_gps_Interval,
  //               params: params,
  //               success: function (res) {
  //                 // success  
  //                 if (res.data.code == 1) {
  //                   console.log("----成功了--" + new Date());
  //                 }
  //               }
  //             })
  //           },
  //         })
  //         setTimeout(function () {
  //           _this.getCarData();
  //         }.bind(this), 1500);
  //       } else {
  //         _this.hud.showError(res.data.msg);
  //       }
  //     },
  //     fail: function () {
  //       _this.hud.showError("网络异常");
  //     },
  //   })
  // },

  /**
   * 预览图片
  */
  previewImage: function (e) {
    wx.previewImage({
      urls: this.data.fileArr // 需要预览的图片http链接列表
    })
  },

  //上传图片
  upLoadFile: function (statusFlag) {
    var params = new Object();
    params.tokenId = app.globalData.tokenId;
    params.flag = statusFlag;
    if (statusFlag == 0) {
      if (_this.data.sendNum == "") {
        _this.hud.showError("请输入装车量");
        return;
      }
      params.weight = _this.data.sendNum;
    } else {
      if (_this.data.recvNum == "") {
        _this.hud.showError("请输入卸车量");
        return;
      }
      params.weight = _this.data.recvNum;
    }
    params.carId = _this.data.model.deliverCarId;
    if (_this.data.files == "") {
      _this.hud.showError("请选择磅单图片");
      return;
    }
    _this.hud.show("上传中...");
    wx.uploadFile({
      url: apiUrl.URL_carBill_add,
      filePath: _this.data.files,
      name: 'image',
      formData: params,
      success: function (res) {
        if (JSON.parse(res.data).code == 1) {
          //_this.hud.showSuccess("上传成功");
          _this.hud.hide();
          wx.getLocation({
            type: "gcj02",
            success: function (res) {
              var params = new Object();
              params.tokenId = app.globalData.tokenId;
              params.lon = res.longitude;
              params.lat = res.latitude;
              params.id  = _this.data.model.deliverCarId;
              if (statusFlag == 0) {
                params.flag = "2";
              } else {
                params.flag = "3";
              }
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
          wx.showModal({
            title: '',
            content: statusFlag == 0 ? '装车信息上传成功!' :'卸车信息上传成功!',
            showCancel:false,
            success:function(res) {
              if (res.confirm) {
                _this.setData({
                  files: ""
                });
                _this.getCarData();
              }
            }
          })
          if (statusFlag = 1) {
            wx.removeStorageSync('carId');
          }
        } else {
          _this.hud.showError(JSON.parse(res.data).msg);
        }
      },
      fail: function () {
        _this.hud.showError("图片上传失败");
      },
      complete: function () {
        _this.hud.hide();
      }
    })
  },
  /**
   * 获取装车量
  */
  zhuangCheNum:function(e) {
    this.data.sendNum = e.detail.value;
  },


  /**
   * 获取卸车量
  */
  xieCheNum: function(e) {
    this.data.recvNum = e.detail.value;
  },

  /**
   * 点击了提交
  */
  clickSubmit:function() {
    if ("1" == _this.data.model.status || "2" == _this.data.model.status || "3" == _this.data.model.status) {
      _this.upLoadFile(0);
    } else if ("4" == _this.data.model.status || "5" == _this.data.model.status){
      _this.upLoadFile(1);
    }
  },

  /**
   * 上传装车磅单模态窗确定按钮
  */
//   _confirmEventFirst: function () {
//     //点击了上传装车磅单
//     _this.upLoadFile(0);
//     this.easyModal.hide();
//   },

//   /**
//    * 上传卸车磅单模态窗确定按钮
//   */
//   _confirmEventSecond: function () {
//     //点击了上传卸车磅单
//     _this.upLoadFile(1);
//     this.easyModalSecond.hide()
//   },

// /**
//  * 模态窗重新上传按钮
// */
//   _confirmEventThird:function () {
//     //点击了重新上传

//   },

//   /**
//    * 模态窗取消按钮
//   */
//   _cancelEvent : function () {
//     console.log("点击取消!");
//   },

  /**
   * 导航按钮
  */
  // clickNavigation:function() {
  //   var latitude;
  //   var longitude;
  //   if (3 >= parseInt(_this.data.model.status)) {
  //     latitude = parseFloat(_this.data.model.sendLat);
  //     longitude = parseFloat(_this.data.model.sendLon); 
  //   } else {
  //     latitude = parseFloat(_this.data.model.receiveLat);
  //     longitude = parseFloat(_this.data.model.receiveLon); 
  //   }
  //   wx.openLocation({
  //     latitude: latitude,
  //     longitude:longitude ,
  //     scale: 28
  //   })
  // }
})

