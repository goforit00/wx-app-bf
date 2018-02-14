var serverConf = require('../config/serverConf')


// 用户登录
function userLoginApi(userLoginParams) {

    return new Promise((resolve, reject) => {

        wx.request({
            url: serverConf.serverUri + "/service/rpc/bf/user/login",
            method: "POST",
            header: {
                'content-type': 'application/json' // 默认值
            },
            data: {
                code: userLoginParams["code"],
                nickName: userLoginParams["nickName"],
                avatarUrl: userLoginParams["avatarUrl"]
            },
            success: res => {
                resolve(res);
            }

        })
    });
}


module.exports = {
    userLoginApi: userLoginApi
}