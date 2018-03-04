//index.js
//获取应用实例
var app = getApp()
var fileData = require('../../utils/data.js')
var userLoginApi = require('../../api/userApi')
var bookReadEventApi = require('../../api/bookReadEventApi')
var dataCacheConf = require('../../config/dataCacheConf')

Page({
    // 页面初始数据
    data: {
        // banner 初始化
        readBookUrl: fileData.getBookDataList(),

        userInfo: {},

        aroundBookEventList:[]
    },

    onLoad: function () {
        //首次打开小程序
    },
    onShow: function () {

        //默认去登陆
        var that = this;
        var userInfo = wx.getStorageSync(dataCacheConf.USER_INFO);
        if (!userInfo) {
            var that = this
            app.getUserInfo(function (userData) {

                userLoginApi.userLoginApi(userData).then((res)=>{
                    if(res && res.data){
                        userInfo = res.data.data
                        wx.setStorage({
                            key:dataCacheConf.USER_INFO,
                            data:userInfo
                        })
                        that.setData({
                            userInfo: userInfo
                        })
                        that.getUserAroundBookEventList(userInfo.id)
                    }
                })
            })
        }else {
            that.setData({
                userInfo: userInfo
            })
            that.getUserAroundBookEventList(userInfo.id)
        }
    },


    /**
     * 获取此用户周围的读书信息
     *
     * @param userId
     */
    getUserAroundBookEventList: function (userId) {

        var that = this
        bookReadEventApi.queryAroundBookReadEvent(userId).then((res) => {

            if (res && res.data && res.data.success) {

                that.setData({
                    aroundBookEventList: res.data.data
                })
            }
        });

    },

    /**
     * 跳转到读书过程的详情页面
     */
    showReadBookProgress:function (event) {
        console.log("event:",event)
        var readBookEventId=event.currentTarget.dataset.id
        wx.navigateTo({
            url:'../others_read_book_progress/others_read_book_progress?readBookEventId='+readBookEventId
        })
    },

    // book
    bookTap: function (e) {
        wx.navigateTo({
            url: '../book/book?aid=' + e.currentTarget.dataset.aid
        })
    }

})
