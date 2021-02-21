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

  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: 'Android极客才看的东西',
      path: '/page/index/index',
      imageUrl: 'https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7112a809f22147bd97b31d7f783ea4d5~tplv-k3u1fbpfcp-watermark.image',
    }
  },

  onShareTimeline: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: 'Android极客才看的东西',
      path: '/page/index/index',
      imageUrl: 'https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7112a809f22147bd97b31d7f783ea4d5~tplv-k3u1fbpfcp-watermark.image',
    }
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
    var loginUserName = wx.getStorageSync('loginUserName');
    var loginUserPassword = wx.getStorageSync('loginUserPassword');
    var jsessionId = wx.getStorageSync('jsessionId');
    const userSession = loginUserName + ";" + jsessionId + ";" + loginUserPassword;
    wx.request({
      url: app.globalData.baseUrl + '/article/list/' + that.data.pageNumber + '/json',
      method: 'GET',
      header: {
        'content-type': 'application/json', // 默认值
        'Cookie': userSession
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

  collect: function(event) {
    const isLogin = wx.getStorageSync('username');
    console.log('isLogin = ', isLogin);
    if (!isLogin) {
      wx.showToast({
        title: '您还未登录，请先登录',
        icon: 'none'
      });
      wx.navigateTo({
        url: '../login/login',
      })
      return;
    }
    const postion = event.currentTarget.id
    const page = this.data.pageList[postion];
    if (page.collect) {
      this.unCollect(postion, page.id);
    } else {
      this.collectPage(postion, page.id);
    }
  },

  unCollect: function(postion, id) {
    wx.request({
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      url: app.globalData.baseUrl + '/lg/uncollect_originId' + '/' + id + '/json',
      success(res) {
        wx.showToast({
          title: '取消收藏成功',
          icon: 'none'
        })
        that.data.pageList[postion].collect = false;
        that.setData({
          pageList: that.data.pageList
        })
        console.log('uncollect page success', res);
      },
      fail(res) {
        console.log('uncollect page fail', res);
        wx.showToast({
          title: '取消收藏失败，请重试',
          icon: 'none'
        })
      }
    })
  },

  collectPage: function(postion, pageId) {
    var loginUserName = wx.getStorageSync('loginUserName');
    var loginUserPassword = wx.getStorageSync('loginUserPassword');
    var jsessionId = wx.getStorageSync('jsessionId');
    const userSession = loginUserName + ";" + jsessionId + ";" + loginUserPassword;
    wx.request({
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Cookie': userSession
      },
      url: app.globalData.baseUrl + '/lg/collect/' + pageId + '/json',
      success(res) {
        if (res.data.errorCode && res.data.errorCode === -1001) {
          wx.showToast({
            title: res.data.errorMsg,
            icon: 'none',
          })
          return;
        }
        wx.showToast({
          title: '收藏成功',
          icon: 'none'
        })
        that.data.pageList[postion].collect = true;
        that.setData({
          pageList: that.data.pageList
        })
        console.log('collect page success', res);
      },
      fail(res) {
        console.log('collect page fail', res);
        wx.showToast({
          title: '收藏失败，请重试',
          icon: 'none'
        })
      }
    })
  }
})