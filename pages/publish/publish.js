var app = getApp()
var dataCacheConf = require('../../config/dataCacheConf')
var bookReadEventApi = require('../../api/bookReadEventApi')
var dateUtil = require('../../utils/dateUtil')

Page({
    data: {

        beginDate: '',
        beginTime: '',
        userInfo: {},
        bookName: "",
        author: "",
        bookId: "",
        saveToastHidden: true
    },

    onLoad: function (options) {

        var beginDate = dateUtil.format(new Date(), "yyyy-MM-dd")
        var beginTime = dateUtil.format(new Date(), "hh:mm:ss")

        this.setData({
            beginDate: beginDate,
            beginTime: beginTime
        })
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
        } else {
            that.setData({
                userInfo: userInfo
            })
        }
    },

    submitForm: function (event) {

        var bookName = event.detail.value.bookName
        var author = event.detail.value.author

        var that = this

        var beginDateTimeStr = that.data.beginDate + " " + that.data.beginTime

        bookReadEventApi.publishUserBookReadEvent(that.data.userInfo.id, bookName, author, that.data.bookId, beginDateTimeStr).then((res) => {
            if (res && res.data) {
                that.setData({
                    saveToastHidden: false
                })
                wx.switchTab({
                    url: '../books/books'
                })
            }
        })

    },

    hideToast: function () {
        this.setData({
            saveToastHidden: true
        })
    },

    bindDateChange: function (event) {
        this.setData({
            nowDate: event.detail.value
        })
    },

    bindTimeChange: function (event) {
        this.setData({
            beginTime: event.detail.value + ":00"
        })

    }

})