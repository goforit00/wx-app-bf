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
                console.log("login user info:",userData)

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

    //标签切换
    switchTab: function (e) {
        let id = e.currentTarget.dataset.id,
            index = parseInt(e.currentTarget.dataset.index)
        this.curIndex = parseInt(e.currentTarget.dataset.index)
        var that = this
        this.setData({
            curNavId: id,
            curIndex: index,
        });

        let latitude;
        let longitude;
        wx.getLocation({
            type: 'wgs84',
            success: function (res) {
                latitude = res.latitude
                longitude = res.longitude
                that.getSportsList(latitude, longitude);
            }
        })
    },
    // 跳转至详情页
    navigateDetail: function (e) {
        //TODO 跳转详情页面
        // wx.navigateTo({
        //     url: '../detail/detail?id=' + e.currentTarget.dataset.id
        // })
    },
    // 加载更多
    loadMore: function (e) {

        var curid = this.data.curIndex

        if (this.data.navSectionItems[curid].length === 0) return

        var that = this
        that.data.navSectionItems[curid] = that.data.navSectionItems[curid].concat(that.data.navSectionItems[curid])
        that.setData({
            list: that.data.navSectionItems,
        })
    },
    // book
    bookTap: function (e) {
        wx.navigateTo({
            url: '../book/book?aid=' + e.currentTarget.dataset.aid
        })
    },
    publishTuan(e) {

        var userInfo = wx.getStorageSync('userInfo');

        wx.request({
            url: 'https://www.baotuan.com:8443/sportsGroup/join', //仅为示例，并非真实的接口地址
            data: {
                userId: userInfo.id,
                sportGroupId: e.currentTarget.dataset.id
            },
            header: {
                'content-type': 'application/json' // 默认值
            },
            success: function (res) {
                if (res.data.success === true) {
                    wx.showToast({
                        title: '恭喜抱团成功 ^_^',
                        icon: 'success',
                        duration: 2000
                    })
                } else {
                    wx.showToast({
                        title: res.data.errMsg,
                        icon: 'success',
                        duration: 2000
                    })
                }
            }
        })
    }
})
