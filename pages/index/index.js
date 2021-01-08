//index.js
//获取应用实例
const app = getApp()
var that = this;

Page({
  data: {
    bannerList: [],
    pageNumber: 0,
    pageList: [],
    isLoad: false,
  },

  onLoad: function () {
    that = this;
    this.getBanner();
  },

  onReachBottom: function () {
    that = this;
    that.setData({
      isLoad: true,
      pageNumber: that.data.pageNumber + 1
    });
    this.getPageList();
  },

  // cardSwiper
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },

  getBanner: function () {
    wx.request({
      url: app.globalData.baseUrl + '/banner/json',
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        that.setData({
          bannerList: res.data.data
        })
      }
    })
    this.getPageList();
  },

  getPageList: function () {
    that = this;
    wx.showLoading({
      title: '加载中...',
    })
    wx.showNavigationBarLoading();
    wx.request({
      url: app.globalData.baseUrl + '/article/list/' + that.data.pageNumber + '/json',
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        wx.hideNavigationBarLoading();
        var list = res.data.data.datas;
        var tempList = that.data.pageList;
        var resultList = tempList.concat(list);
        that.setData({
          isLoad: false,
          pageList: resultList
        })
        wx.hideLoading();
      },
      fail(res) {
        console.log('request index page fail', res);
        wx.hideLoading();
      }
    })
  },
  isCard(e) {
    this.setData({
      isCard: e.detail.value
    })
  },
})