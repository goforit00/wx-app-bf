// pages/place_detail/place_detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailData:{
      longitude: "113.324520",
      latitude: "23.099994"
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getPlaceDetail(options.id);
  },

  getPlaceDetail: function (id) {
      let self = this;
      wx.request({
          url: 'https://www.baotuan.com:8443/place/get', //仅为示例，并非真实的接口地址
          data: {
              id: id
          },
          header: {
              'content-type': 'application/json' // 默认值
          },
          success: function(res) {
            var data = res.data.data;
            var markers = {
              id: 0,
              latitude: data.latitude,
              longitude: data.longitude,
              width: 50,
              height: 50
            }
            data.markers = [];
            data.markers.push(markers);
            self.setData({
              detailData: data
            });
              
          }
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  publishTuan(e) {
    wx.reLaunch({
      url: '../pages/publish/publish?groupId=' + e.currentTarget.dataset.id,
    })
  }

})