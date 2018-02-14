var myData = require("../../utils/data")
const date = new Date()
const years = []
const months = []
const days = []

for (let i = 1990; i <= date.getFullYear(); i++) {
    years.push(i)
}

for (let i = 1 ; i <= 12; i++) {
    months.push(i)
}

for (let i = 1 ; i <= 31; i++) {
    days.push(i)
}
Page({
    data:{
        province:myData.provinceData(),
        city:myData.cityData(),
        proviIndex:0,
        cityIndex:0,
        saveToastHidden:true,
        date: '2017-10-21',
        time: '19:00',
        userInfo:{},

        userProvince:"",
        userCity:"",

        findSportPlace:{},

        findSportPlaceList:[],
        sportPlaceName:"",

        placeLongitude:"",
        placeLatitude:"",
        sportPlaceAddress:"",
        inputSportPlaceAddress:"",

        navTopItems: [
            {title:'现有场馆',id:0},
            {title:'地点自由',id:1}
        ],
        curNavId: 0,
        curIndex: 0,

    },


    onLoad:function(options){

    },

    onShow:function(){
        var userInfo=wx.getStorageSync("userInfo");

        var that=this

        wx.getLocation({
            type: 'wgs84',
            success: function(res) {
                var latitude = res.latitude
                var longitude = res.longitude;

                var markers = [];
                var marker = {
                    id:1,
                    latitude:latitude,
                    longitude:longitude,
                    title:"test",
                };
                markers.push(marker);

                that.setData({
                    latitude:latitude,
                    longitude:longitude,
                    userInfo:userInfo,
                    markers: markers
                })


                wx.request({
                    url:"https://www.baotuan.com:8443/geo/address",

                    data:{
                        longitude:longitude,
                        latitude:latitude
                    },

                    success:function(res){

                        console.log("根据经纬度查询省市:",res)
                        that.setData({
                            userProvince:res.data.province,
                            userCity:res.data.city
                        })
                    }
                }),

                that.getSportPlaceList({longitude:longitude,latitude:latitude})
            }
        })


    },

    doInputSportPlaceName:function(e){

        var that=this
        var sportPlaceName=e.detail.value

        this.getSportPlaceList({"name":sportPlaceName})
    },

    getSportPlaceList:function(query){
        var that=this
        wx.request({
            url:"https://www.baotuan.com:8443/place/query",
            data:query,
            success:res=>{

                that.setData({
                    findSportPlaceList:res.data.data.items,
                })

            }
        })
    },

    doInputAddressPlace:function(e){

        var that=this
        var address=e.detail.value

        wx.request({
            url:"https://www.baotuan.com:8443/geo/position",
            data:{
                address:address
            },
            success:function (res) {
                var data = {
                    longitude:res.data.longitude,
                    latitude:res.data.latitude,

                    markers:[
                        {
                            id:1,
                            latitude:res.data.longitude,
                            longitude:res.data.latitude,
                            title:address,
                        }
                    ],
                    inputSportPlaceAddress:e.detail.value
                };
                console.log(data);
                that.setData(data)
            }
        })

    },

    confirmPlace:function(e){

        var address=""

        if(!this.data.curNavId){

        }else{
            address=this.data.userProvince+this.data.userCity+this.data.inputSportPlaceAddress
        }

        var pages = getCurrentPages();

        var currPage = pages[pages.length - 1];   //当前页面
        var prevPage = pages[pages.length - 2];  //上一个页面
        prevPage.setData({
            sportAddress: address
        })
        wx.navigateBack({delta: 1})

    },

    doConfirmSportPlace:function(e){

        console.log("确认选择：",e)

        var placeId=e.currentTarget.dataset.id
        var placeName=""

        for(var i=0;i<this.data.findSportPlaceList.length;i++){
            if(this.data.findSportPlaceList[i].id===placeId){
                placeName=this.data.findSportPlaceList[i].name;
            }
        }

        var pages = getCurrentPages();

        var currPage = pages[pages.length - 1];   //当前页面
        var prevPage = pages[pages.length - 2];  //上一个页面
        prevPage.setData({
            sportAddress: placeName,
            sportPlaceId: placeId
        })
        wx.navigateBack({delta: 1})

    },

    bindPickerChange:function(e){

        e.detail.value

    },

    //标签切换
    switchTab: function(e) {
        let id = e.currentTarget.dataset.id,
            index = parseInt(e.currentTarget.dataset.index)
        this.curIndex = parseInt(e.currentTarget.dataset.index)
        var that = this
        this.setData({
            curNavId: id,
            curIndex: index,
        });

    }
})