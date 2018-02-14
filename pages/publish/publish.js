var app = getApp()
var dataCacheConf = require('../../config/dataCacheConf')
var bookReadEventApi = require('../../api/bookReadEventApi')

Page({
    data:{

        nowDate: '2017-10-21',
        nowTime: '19:00',
        userInfo:{},
        bookName:"",
        author:""
    },

    onLoad:function(options){

        //TODO 当前时间
        this.nowDate= new Date().getDate()
        this.nowTime= new Date().getTime()
    },

    onShow:function(){

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
                    }
                })
            })
        }else {
            that.setData({
                userInfo: userInfo
            })
        }

    }


})