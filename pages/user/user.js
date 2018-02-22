//获取应用实例
var app = getApp()
var dataCacheConf = require('../../config/dataCacheConf')
var userLoginApi = require('../../api/userApi')


Page({
    // 页面初始数据
    data: {
        userInfo: {}
    },

    onShow: function (e) {

        //默认去登陆
        var that = this;
        var userInfo = wx.getStorageSync(dataCacheConf.USER_INFO);
        if (!userInfo) {
            var that = this
            app.getUserInfo(function (userData) {
                userLoginApi.userLoginApi(userData).then((res) => {
                    if (res && res.data) {
                        userInfo = res.data.data
                        wx.setStorage({
                            key: dataCacheConf.USER_INFO,
                            data: userInfo
                        })
                        that.setData({
                            userInfo: userInfo
                        })
                    }
                })
            })
        } else {
            that.setData({
                userInfo: userInfo
            })
        }
    }

})
