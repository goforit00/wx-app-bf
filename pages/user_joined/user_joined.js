//获取应用实例

var app = getApp()
var myData = require('../../utils/data')
var util = require('../../utils/util')

Page({
  // 页面初始数据
  data: {
    userData: myData.userData(),
    curUserStatusOperate: '登录',
    playList: [],
    special_text: "--已加载至最新数据--",
    no_data_text: "--暂无数据--"
  },
  // 地址编辑
  editAddr: function (e) {
    console.log(e)
    wx.navigateTo({
      url: '../edit_addr/edit_addr?addrid=' + e.currentTarget.dataset.addrid
    })
  },
  navigateDetail: function (e) {
    //TODO 跳转详情页
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../detail/detail?id=' + e.currentTarget.dataset.id
    })
  },
  onReady: function () {
    var that = this;
      let latitude;
      let longitude;
      wx.getLocation({
          type: 'wgs84',
          success: function(res) {
              console.log(res)
              latitude = res.latitude
              longitude = res.longitude
              that.getSportsList(latitude,longitude);
          }
      });
  },

    getSportsList: function (latitude,longitude) {
        var that = this;
        wx.request({
            url: "https://www.baotuan.com:8443/sportsGroup/myJoin?userId=" + wx.getStorageSync("userInfo").id + "&page=1&size=1000&latitude=" + latitude + "&longitude=" + longitude,
            success: function (res) {
                console.log(res)
                that.setData({
                    playList: res.data
                })
            },
            fail: function (res) {
                console.log(res);
            }
        })
    }

})
