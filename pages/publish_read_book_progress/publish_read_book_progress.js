var app = getApp()
var dataCacheConf = require('../../config/dataCacheConf')
var bookReadEventApi = require('../../api/bookReadEventApi')
var dateUtil = require('../../utils/dateUtil')
var readBookProgressApi = require('../../api/readBookProgressApi')


Page({
    data: {

        saveToastHidden: true,

        readProcessList: [5,10, 20, 30,40,45,50,55,60,70,80,90,95,100],

        readProcessRateStr: "5%",
        readProcessRate: 5,

        readBookEventId:"",

        userInfo:{}
    },


    onLoad: function (option) {

        var readBookEventId=option.readBookEventId

        this.setData({
            readBookEventId:readBookEventId
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

    bindReadProcessChange: function (event) {
        console.log("event:", event)

        this.setData({
            readProcessRate: this.data.readProcessList[event.detail.value],
            readProcessRateStr: this.data.readProcessList[event.detail.value] + " %"
        })
    },


    submitForm: function (event) {

        var progress = this.data.readProcessRate
        var userNote = event.detail.value.userNote
        var readBookEventId = this.data.readBookEventId
        var userId=this.data.userInfo.id

        console.log("progressRage:",progress,";userNote:",userNote,";eventId:",readBookEventId,";userId:",userId)

        var that=this

        readBookProgressApi.publishUserReadBookProgress(userId,readBookEventId,progress,userNote).then((res)=>{
            console.log("res:",res)
            if(res && res.data && res.data.success){
                that.setData({
                    saveToastHidden: false
                })
            }else {

            }
        })

    },

    hideToast: function () {
        this.setData({
            saveToastHidden: true
        })

        wx.navigateBack({
            delta: 1
        })
    }

})