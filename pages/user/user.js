//获取应用实例
var app = getApp()
var myData = require('../../utils/data')
var util = require('../../utils/util')

Page({
  // 页面初始数据
  data: {
    userData: {},
    curUserStatusOperate: '登录',
    //image_array_png:'../../images/arrow.png'
  },

  onLoad: function(e){

    var userInfo=wx.getStorageSync("userInfo");
    var that = this;
    var defaultUserInfo = myData.defaultUserInfo();

    if(!userInfo){
      //未登录
      that.setData({
        curUserStatusOperate: "登录",
        userData: defaultUserInfo
      })
    }else{
      //已登录
      that.setData({
        curUserStatusOperate:"退出",
        userData: userInfo
      })
    }

  },

  // 地址编辑
  // editAddr : function(e){
  //   console.log(e)
  //   wx.navigateTo({
  //     url:'../edit_addr/edit_addr?addrid='+e.currentTarget.dataset.addrid
  //   })
  // },

  logInOrOut: function(e){

    var that = this;

    var userInfo=wx.getStorageSync("userInfo");

    if(!userInfo){
      //未登录
      that.userLogin()

      that.setData({
        curUserStatusOperate:"退出"
      })

    }else{
      //已登录
      that.userLogout()
      var defaultUserInfo = myData.defaultUserInfo();
      that.setData({
        curUserStatusOperate:"登录",
        userData:defaultUserInfo
      })
    }
  },

  userLogin:function(){
    var that=this
    app.getUserInfo(function(userData){

      that.loginAndGetUser(userData)

    })
  },

  loginAndGetUser:function(userLoginParams){

    var that = this

    wx.request({
      url:"https://www.baotuan.com:8443/user/login",
      data:{
        code: userLoginParams["code"],
        nickName: userLoginParams["nickName"],
        avatarUrl: userLoginParams["avatarUrl"]
      },
      success:function(res){

        var userInfo=res.data.data
        that.setData({
          userData:res.data.data
        })
        wx.setStorageSync("userInfo",userInfo);

      },
      header: {
        'content-type': 'application/json' // 默认值
      }
    })
  },

  userLogout:function(){
    wx.setStorageSync("userInfo","");
  },

  userInfo: function(){
    var userInfo = wx.getStorageSync("userInfo");
    if (!userInfo) {
      return;
    } else {
      wx.navigateTo({
        url:'../user_info/user_info'
      })
    }

  }

})
