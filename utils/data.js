/**
 * banner数据
 */
function getBannerData() {
    var arr = ['http://h0.hucdn.com/open/201742/3ec61899f5a9e1eb_1920x1277.jpg', 'http://h0.hucdn.com/open/201742/4d07e0a00bbc21a3_1920x1282.jpg', 'http://h0.hucdn.com/open/201742/ee7a2044ead1ef28_1920x1280.jpg', 'http://h0.hucdn.com/open/201742/e5c89d3824b466d8_1920x1280.jpg']
    return arr
}

function getPlaceBannerData() {
    var arr = ['http://h0.hucdn.com/open/201742/de8078e8679e2059_1920x1280.jpg', 'http://h0.hucdn.com/open/201742/5d6694f19d2ecf31_1920x1443.jpg', 'http://h0.hucdn.com/open/201742/ea1881987d1fbc09_1920x1258.jpg', 'http://h0.hucdn.com/open/201742/e9454868b0807cfa_1920x1280.jpg']
    return arr
}


function getBookDataList() {
    var arr = ['http://bf-bucket.su.bcebos.com/readBook1.png', 'http://bf-bucket.su.bcebos.com/readBook2.jpg', 'http://bf-bucket.su.bcebos.com/readBook3.png']
    return arr
}

/*
 * 首页 navnav 数据
 */
function getIndexNavData() {
    var arr = [
        {
            id: 1,
            icon: "../../images/nav_icon_01.png",
            title: "推荐"
        },
        {
            id: 2,
            icon: "../../images/nav_icon_02.png",
            title: "美甲"
        },
        {
            id: 3,
            icon: "../../images/nav_icon_03.png",
            title: "美容"
        },
        {
            id: 4,
            icon: "../../images/nav_icon_04.png",
            title: "美发"
        },
        {
            id: 5,
            icon: "../../images/nav_icon_05.png",
            title: "美睫"
        }
    ]
    return arr
}

/*
 * 首页 对应 标签 数据项
 */
function getIndexNavSectionData() {
    var arr = [
        {

            subject: "秋季自然特价美甲",
            coverpath: "../../images/recommend_img_01.png",
            price: '¥198',
            message: '我们追求的是没有最长只有更长！'
        },
        {

            subject: "睫毛稀疏 种睫毛来帮忙",
            coverpath: "../../images/recommend_img_02.png",
            price: '¥1888',
            message: '我们追求的是没有最长只有更长！'
        },
        {

            subject: "爱丽克EircParisSalon",
            coverpath: "../../images/recommend_img_03.png",
            price: '¥1588',
            message: '我们追求的是没有最长只有更长！'
        },
        {

            subject: "伊本造型",
            coverpath: "../../images/recommend_img_05.png",
            price: '¥198',
            message: '伊本造型是由著名形象设计师杨进先生创办。'
        },
        {

            subject: " 画对了妆，微微一笑颜值倍儿高！",
            coverpath: "../../images/recommend_img_06.png",
            price: '¥198',
            message: '《微微一笑很倾城》的剧照简直美腻到不要不要的'
        }
    ]
    return arr
}

/**
 * 技师 数据
 * */
function getSkilledData() {
    var arr = [
        {
            company: "西狮独品美容美发有限公司",
            avatar: "../../images/skilledt_img_01.png",
            nickname: '张技师',
            price: '¥500',
            message: '从事美发行业60余年，有丰富经验',
            distance: '100m'
        },
        {
            company: "圆月亮美甲沙龙",
            avatar: "../../images/skilledt_img_02.png",
            nickname: '包技师',
            price: '¥800',
            message: '从事美发行业60余年，有丰富经验',
            distance: '200m'
        },
        {
            company: "璀璨美睫会所",
            avatar: "../../images/skilledt_img_03.png",
            nickname: '王技师',
            price: '¥600',
            message: '从事美发行业60余年，有丰富经验',
            distance: '100m'
        },
        {
            company: "柔丝妮美容养生馆",
            avatar: "../../images/skilledt_img_04.png",
            nickname: '黄技师',
            price: '¥800',
            message: '从事美发行业60余年，有丰富经验',
            distance: '400m'
        }
    ]
    return arr
}

/**
 * 选择器 数据
 */
function getPickerData() {
    var arr = [
        {
            name: '张三',
            phone: '13812314563',
            province: '北京',
            city: '北京',
            addr: '朝阳区望京悠乐汇A座8011'
        },
        {
            name: '李四',
            phone: '13812314563',
            province: '北京市',
            city: '北京市',
            addr: '朝阳区望京悠乐汇A座4020'
        }
    ]
    return arr
}

/**
 * 查询 地址
 * */
var user_data = userData()

function searchAddrFromAddrs(addrid) {
    var result
    for (let i = 0; i < user_data.addrs.length; i++) {
        var addr = user_data.addrs[i]
        console.log(addr)
        if (addr.addrid == addrid) {
            result = addr
        }
    }
    return result || {}
}

/**
 * 用户数据
 * */
function userData() {
    var arr = {
        uid: '1',
        nickname: '三炮',
        name: '张三',
        phone: '13833337998',
        avatar: '../../images/avatar.png',
        sex: 'male',
        addrs: [
            {
                addrid: '1',
                name: '张三',
                phone: '13812314563',
                province: '北京',
                city: '直辖市',
                addr: '朝阳区望京悠乐汇A座8011'
            },
            {
                addrid: '2',
                name: '李四',
                phone: '13812314563',
                province: '北京',
                city: '直辖市',
                addr: '朝阳区望京悠乐汇A座4020'
            }
        ]
    }
    return arr
}

/**
 * 省
 * */
function provinceData() {
    var arr = [
        // {pid:1,pzip:'110000',pname:'北京市'},
        // {pid:2,pzip:'120000',pname:'天津市'}
        '请选择省份', '福建省'
    ]
    return arr
}

/**
 * 市
 * */
function cityData() {
    var arr = [
        // {cid:1,czip:'110100',cname:'市辖区',pzip:'110000'},
        // {cid:2,czip:'120100',cname:'市辖区',pzip:'120000'}
        '羽毛球', '乒乓球', '排球'
    ]
    return arr
}

/**
 * 活动列表
 */
function playList() {
    var list = [
        {
            "title": "测试一",
            "price": "10",
            "time_range": "2017-10-22 10:30:35",
            "adress": "浙江省杭州市江干区九堡镇",
            "curNum": "1",
            "totalNum": "11"
        },
        {
            "title": "测试输入长度啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊",
            "price": "654",
            "time_range": "2017-10-23 10:30:35",
            "adress": "浙江省杭州市江干区下沙江滨",
            "curNum": "3",
            "totalNum": "13"
        },
        {
            "title": "正儿八经测试",
            "price": "43",
            "time_range": "2017-10-21 11:30:35",
            "adress": "浙江省杭州市江干区金沙湖游泳馆",
            "curNum": "13",
            "totalNum": "13"
        }
    ]

    return list;
}

/**
 * 游客身份
 */
function defaultUserInfo() {
    var userInfo = {
        id: 0,
        nick: '游客',
        name: '游客',
        avatar: 'http://h0.hucdn.com/images/201742/ebee87d551b7f5bc_255x255.jpg'
    }
    return userInfo;
}

/*
 * 对外暴露接口
 */
module.exports = {
    getBannerData: getBannerData,
    getIndexNavData: getIndexNavData,
    getIndexNavSectionData: getIndexNavSectionData,
    getPickerData: getPickerData,
    getSkilledData: getSkilledData,
    userData: userData,
    provinceData: provinceData,
    cityData: cityData,
    searchAddrFromAddrs: searchAddrFromAddrs,
    defaultUserInfo: defaultUserInfo,
    playList: playList,
    getPlaceBannerData: getPlaceBannerData,
    getBookDataList : getBookDataList

}