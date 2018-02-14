var app = getApp()
Page( {
  data: {
    userInfo:{},
    id:'',
    detailData:{},
      modalHidden:true,
      modalHidden2:true
  },

    showModal:function(){
        this.setData({
            modalHidden:!this.data.modalHidden
        })
    },
    modalBindaconfirm:function(){
        this.setData({
            modalHidden:!this.data.modalHidden
        });
        this.publishTuan();
    },
    modalBindcancel:function(){
        this.setData({
            modalHidden:!this.data.modalHidden
        })
    },

    showModal2:function(){
        this.setData({
            modalHidden2:!this.data.modalHidden2
        })
    },
    modalBindaconfirm2:function(){
        this.setData({
            modalHidden2:!this.data.modalHidden2
        });
        this.quitTuan();
    },
    modalBindcancel2:function(){
        this.setData({
            modalHidden2:!this.data.modalHidden2
        })
    },

  onLoad: function (options) {
    this.getDetailData(options.id);

    var userInfo=wx.getStorageSync('userInfo');

    this.setData({
      id: options.id,
      userInfo:userInfo
    })
  },
  getLocation:function(){
    wx.navigateTo({
      url:'../location/location'
    })
  },
  bookTap:function(){
    wx.navigateTo({
      url:'../book/book'
    })
  },
  getDetailData(id){
    let self = this;
    wx.request({
      url: 'https://www.baotuan.com:8443/sportsGroup/getById', //仅为示例，并非真实的接口地址
      data: {
        id: id,
          userId: wx.getStorageSync("userId")
      },
      header: {
          'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        console.log(res.data)
        self.setData({
          detailData:res.data
        })
      }
    })
  },
  publishTuan:function(){

    var that=this

    var userInfo=wx.getStorageSync('userInfo');

    wx.request({
      url: 'https://www.baotuan.com:8443/sportsGroup/join', //仅为示例，并非真实的接口地址
      data: {
         userId:userInfo.id,
         sportGroupId:that.data.detailData.id
      },
      header: {
          'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        if(res.data.success === true){
          wx.showToast({
            title: '抱名成功',
            icon: 'success',
            duration: 2000
          });
          that.getDetailData(that.data.detailData.id);
        }else{
          wx.showToast({
            title: res.data.errMsg,
            icon: 'success',
            duration: 2000
          })
        }
      }
    })
  },
    quitTuan:function () {
        var that=this

        var userInfo=wx.getStorageSync('userInfo');

        wx.request({
            url: 'https://www.baotuan.com:8443/sportsGroup/quit', //仅为示例，并非真实的接口地址
            data: {
                userId:userInfo.id,
                sportGroupId:that.data.detailData.id
            },
            header: {
                'content-type': 'application/json' // 默认值
            },
            success: function(res) {
                if(res.data.success === true){
                    wx.showToast({
                        title: '取消成功',
                        icon: 'success',
                        duration: 2000
                    });
                    that.getDetailData(that.data.detailData.id);
                }else{
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