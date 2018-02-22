//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo:function(cb){
    var that = this

    //TODO 不用这里的缓存,永远都重新调用
    //if(this.globalData.userInfo){
    if(false){
        typeof cb == "function" && cb(this.globalData.userInfo)
      }else{
        //调用登录接口
        wx.login({
          success: function (loginRes) {

            var code = loginRes.code

            wx.getUserInfo({
              success: function (res) {
                that.globalData.userInfo = res.userInfo
                var userData=res.userInfo
                userData["code"]=code
                typeof cb == "function" && cb(userData)
              }
            })
          }
        })
    }
  },
  globalData:{
    userInfo:null
  }
})