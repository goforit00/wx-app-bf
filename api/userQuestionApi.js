var serverConf = require('../config/serverConf')

// 用户登录
function userSubmitQuestionApi(userId,question) {

    return new Promise((resolve, reject) => {

        wx.request({
            url: serverConf.serverUri + "/service/rpc/bf/question/submit",
            method: "POST",
            data:{
                userId:userId,
                question:question
            },
            header: {
                'content-type': 'application/json;charset=utf-8' // 默认值
            },

            success: res => {
                resolve(res);
            }

        })
    });
}


module.exports = {
    userSubmitQuestionApi: userSubmitQuestionApi
}