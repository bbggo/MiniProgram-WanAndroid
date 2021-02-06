// pages/mycollect/mycollect.js

var that = this;
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageNo: 0,
    isLoad: false,
    articleList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    wx.showLoading({
      title: '加载中...',
    })
    that.getMyCollectList();
  },

  getMyCollectList: function () {
    that = this;
    console.log(app.globalData.baseUrl + '/lg/collect/list/0/json');
    var islogin = wx.getStorageSync('username');
    var loginUserName = wx.getStorageSync('loginUserName');
    var loginUserPassword = wx.getStorageSync('loginUserPassword');
    var jsessionId = wx.getStorageSync('jsessionId');
    const userSession = loginUserName + ";" + jsessionId + ";" + loginUserPassword;
    console.log('username = ', islogin, loginUserName, loginUserPassword, userSession);
    wx.request({
      url: app.globalData.baseUrl + '/lg/collect/list/0/json',
      method: "GET",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Cookie': userSession,
      },
      success(res) {
        console.log('success = ', res)
        var list = res.data.data.datas
        var dataList = that.data.articleList
        var resultList = []
        resultList = dataList.concat(list)
        that.setData({
          isLoad: false,
          articleList: resultList
        })
        wx.hideLoading();
      },
      fail(res) {
        that.setData({
          isLoad: false,
        })
        console.log('request collect page error', res);
        wx.hideLoading();
      }
    })
  },

  uncollect: function(event) {
    const postion = event.currentTarget.id
    const artical = this.data.articleList[postion];
    wx.showLoading({
      title: '加载中...',
    })
    var loginUserName = wx.getStorageSync('loginUserName');
    var loginUserPassword = wx.getStorageSync('loginUserPassword');
    var jsessionId = wx.getStorageSync('jsessionId');
    const userSession = loginUserName + ";" + jsessionId + ";" + loginUserPassword;
    var originId = -1;
    if (artical.originId) {
      originId = artical.originId;
    }
    wx.request({
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Cookie': userSession,
      },
      url: app.globalData.baseUrl + '/lg/uncollect' + '/' + artical.id + '/json',
      data: {
        'originId': originId,
      },
      success(res) {
        wx.showToast({
          title: '取消收藏成功',
          icon: 'none'
        })
        console.log('uncollect page success', res);
        that.data.articleList.splice(postion, 1);
        that.setData({
          articleList: that.data.articleList
        });
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})