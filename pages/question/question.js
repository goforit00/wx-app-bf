var userQuestionApi = require('../../api/userQuestionApi')
var dataCacheConf = require('../../config/dataCacheConf')

Page({
    data: {
        question: "",

        userInfo: "",

        saveToastHidden: true
    },
    onLoad: function (options) {

    },

    onShow: function () {
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
        }else {
            that.setData({
                userInfo: userInfo
            })
        }
    },

    submitForm: function (e) {
        console.log("submit e:",e)
        var that = this;
        that.setData({
            saveToastHidden: false
        })
        var question = e.detail.value.question
        var userInfo = wx.getStorageSync(dataCacheConf.USER_INFO);

        console.log("userId:",userInfo.id,";question:",question)
        userQuestionApi.userSubmitQuestionApi(userInfo.id, question)
    },

    hideToast: function () {
        this.setData({
            saveToastHidden: true
        })
    }

})