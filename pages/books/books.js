//index.js
//获取应用实例
var app = getApp()
var fileData = require('../../utils/data.js')
var bookReadEventApi = require('../../api/bookReadEventApi')
var dataCacheConf = require('../../config/dataCacheConf')

Page({
    // 页面初始数据
    data: {

        userInfo:{},

        userReadBookEventList:[]
    },

    onShow: function () {

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
                        that.getUserReadBookInfo(userInfo.id)
                    }
                })
            })
        } else {
            that.setData({
                userInfo: userInfo
            })
            that.getUserReadBookInfo(userInfo.id)
        }
    },

    /**
     * 获取用户读书
     * @param userId
     */
    getUserReadBookInfo(userId) {

        var that = this

        bookReadEventApi.queryUserBookReadEvent(userId).then((res) => {

            if (res && res.data && res.data.success) {
                that.setData({
                    userReadBookEventList: res.data.data
                })
            }
        })
    },

    //标签切换
    switchTab: function(e) {
        let id = e.currentTarget.dataset.id,
            index = parseInt(e.currentTarget.dataset.index)
        this.curIndex = parseInt(e.currentTarget.dataset.index)
        console.log(e)
        var that = this
        this.setData({
            curNavId: id,
            curIndex: index,
        })

    },
    // 跳转至详情页
    navigateDetail: function(e){
        wx.navigateTo({
          url:'../place_detail/place_detail?id=' + e.currentTarget.dataset.id
        })
    },
    // 加载更多
    loadMore: function (e) {
        console.log('加载更多')

        console.log("current index:",this.data.curIndex)
        var curid = this.data.curIndex

        if (this.data.navSectionItems[curid].length === 0) return

        var that = this
        that.data.navSectionItems[curid] = that.data.navSectionItems[curid].concat(that.data.navSectionItems[curid])
        that.setData({
            list: that.data.navSectionItems,
        })
    },
    // book
    bookTap: function(e){
        wx.navigateTo({
            url:'../book/book?aid='+e.currentTarget.dataset.aid
        })
    }

})
