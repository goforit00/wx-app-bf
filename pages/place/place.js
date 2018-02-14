//index.js
//获取应用实例
var app = getApp()
var fileData = require('../../utils/data.js')

Page({
    // 页面初始数据
    data: {
        colors:['red','orange','yellow','green','purple'],
        // banner 初始化
        banner_url: fileData.getPlaceBannerData(),
        indicatorDots: true,
        vertical: false,
        autoplay: true,
        interval: 3000,
        duration: 1000,
        // nav 初始化
        navTopItems: [],
        navSectionItems: [],
        curNavId: 1,
        curIndex: 0,

        sportPlaceList:[],
        controls:[{
            id: 2,
            //iconPath: '/resources/location.png',
            position: {
                left: 0,
                top: 300 - 50,
                width: 50,
                height: 50
            },
            clickable: true
        }]
    },

    onShow:function(){
        var that = this;
        that.getSportPlaceList()
    },

    getSportPlaceList:function(){

        var that = this;

        wx.request({
            url:"https://www.baotuan.com:8443/place/query",
            data:{},
            success:function(res){

                console.log("获取场地列表数据：",res)
                console.log("items:",res.data.data.items)

                that.setData({
                    sportPlaceList:res.data.data.items,
                })
            },
            header: {
                'content-type': 'application/json' // 默认值
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
