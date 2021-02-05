// pages/my/my.js
var that = this;
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    username: '',
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('option = ', options, options.username);
    var name = '';
    if (!options.username) {
      var username = wx.getStorageSync('username');
      if (username) {
        name = username;
      } else {
        name = '请登录';
      }
    } else {
      name = options.username;
    }
    this.setData({
      username: name,
    })
  },

  login: function() {
    console.log('login username = ', this.data.username);
    if (this.data.username) {
      wx.showToast({
        title: '已登录',
        icon: 'none',
      })
      return;
    }
    wx.navigateTo({
      url: '../login/login'
    });
  },

  CopyLink(e) {
    wx.setClipboardData({
      data: e.currentTarget.dataset.link,
      success(res) {
        wx.showToast({
          title: '已复制',
          duration: 1000
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