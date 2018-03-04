//index.js
//获取应用实例
var app = getApp()
var readBookProgressApi = require('../../api/readBookProgressApi')
var dataCacheConf = require('../../config/dataCacheConf')
var userLoginApi = require('../../api/userApi')

Page({
    // 页面初始数据
    data: {

        userInfo:{},

        readBookProgressList:[],

        readBookEventId:""
    },

    onLoad:function (option) {

        var readBookEventId=option.readBookEventId

        this.setData({
            readBookEventId:readBookEventId
        })
    },

    onShow: function () {

        var that = this;
        var userInfo = wx.getStorageSync(dataCacheConf.USER_INFO);
        var readBookEventId=that.data.readBookEventId

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
                        that.getUserReadBookProgressInfo(readBookEventId)
                    }
                })
            })
        } else {
            that.setData({
                userInfo: userInfo
            })
            that.getUserReadBookProgressInfo(readBookEventId)
        }
    },

    /**
     * 获取读书事件 对应的读书进度
     *
     * @param eventId
     */
    getUserReadBookProgressInfo(eventId) {

        var that = this

        readBookProgressApi.queryReadBookProgressByEventId(eventId).then((res)=>{
            if( res && res.data && res.data.success){
                that.setData({
                    readBookProgressList:res.data.data
                })

            }
        })
    },

    /**
     * 跳转到发布读书过程的页面
     */
    publishReadBookProgress:function () {
        var that=this
        wx.navigateTo({
            url:'../publish_read_book_progress/publish_read_book_progress?readBookEventId='+that.data.readBookEventId
        })
    }

})
