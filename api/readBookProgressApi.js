var serverConf = require('../config/serverConf')

/**
 * 获取读书事件的读书 进度列表
 *
 * @param eventId
 * @returns {Promise}
 */
function queryReadBookProgressByEventId(eventId) {

    return new Promise((resolve, reject) => {

        wx.request({
            url: serverConf.serverUri + "/service/rpc/bf/book/progress/findByEventId/" + eventId,
            method: "GET",
            header: {
                'content-type': 'application/json' // 默认值
            },
            data: {},
            success: res => {
                resolve(res);
            }

        })
    });
}



/**
 * 发布读书进度
 *
 * @param userId
 * @param readBookEventId
 * @param readProgress
 * @param userNote
 * @returns {Promise}
 */
function publishUserReadBookProgress(userId, readBookEventId, readProgress, userNote) {

    return new Promise((resolve, reject) => {

        wx.request({
            url: serverConf.serverUri + "/service/rpc/bf/book/progress/publish",
            method: "POST",
            header: {
                'content-type': 'application/json' // 默认值
            },
            data: {
                userId: userId,
                readBookEventId: readBookEventId,
                readProgress: readProgress,
                userNote: userNote
            },
            success: res => {
                resolve(res);
            }

        })
    });
}


module.exports = {
    queryReadBookProgressByEventId: queryReadBookProgressByEventId,
    publishUserReadBookProgress: publishUserReadBookProgress
}
