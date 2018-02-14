var serverConf = require('../config/serverConf')

/**
 * 获取用户周围的 读书事件
 * @param userId
 * @returns {Promise}
 */
function queryAroundBookReadEvent(userId) {

    return new Promise((resolve, reject) => {

        wx.request({
            url: serverConf.serverUri + "/service/rpc/bf/book/event/queryAroundUser/" + userId,
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
 * 获取 此用户的 读书事件
 * @param userId
 * @returns {Promise}
 */
function queryUserBookReadEvent(userId) {

    return new Promise((resolve, reject) => {

        wx.request({
            url: serverConf.serverUri + "/service/rpc/bf/book/event/query/" + userId,
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
 * 发布读书消息
 *
 * @param userId
 * @param bookName
 * @param author
 * @param bookId
 * @param beginTime
 * @returns {Promise}
 */
function publishUserBookReadEvent(userId,bookName,author,bookId,beginTime) {

    return new Promise((resolve, reject) => {

        wx.request({
            url: serverConf.serverUri + "/service/rpc/bf/book/event/publish/" ,
            method: "POST",
            header: {
                'content-type': 'application/json' // 默认值
            },
            data: {
                userId:userId,
                bookName:bookName,
                author:author,
                bookId:bookId,
                beginTime:beginTime
            },
            success: res => {
                resolve(res);
            }

        })
    });
}


module.exports = {
    queryAroundBookReadEvent: queryAroundBookReadEvent,
    queryUserBookReadEvent: queryUserBookReadEvent
}
