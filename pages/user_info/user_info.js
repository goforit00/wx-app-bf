var myData = require("../../utils/data")

Page({
  data: {
    data_nick: "",
    data_mobile: "",
    data_interest: "",
    data_birthday: "",
    saveToastHidden: true
  },
  onLoad: function (options) {  
    var init = wx.getStorageSync("userInfo");

    this.setData({
      data_nick: init.nick,
      data_mobile: init.mobile,
      data_interest: init.interest,
      data_birthday: init.birthday
    });
  },

  submitForm: function (e) {
    var self = this;
    wx.request({
      url: "",
      data: {
        birthday: "",
        mobile: "",
        interest: ""
      },
      success: function (res) {
        wx.setStorageSync("userId", userInfo.id);
        console.log('保存成功')
        self.setData({
          saveToastHidden: false
        })
      },
    });

  },
  hideToast: function () {
    this.setData({
      saveToastHidden: true
    })
  }

})