// pages/login/login.js

var that = this;
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    password: '',
    repassword: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  loginusername: function(e) {
    this.setData({
      username: e.detail
    })
  },

  loginpassword: function(e) {
    this.setData({
      password: e.detail
    })
  },

  clicklogin: function() {

  },

  clickregister: function() {
    console.log('username = ', this.data.username);
    if (this.data.username === '') {
      wx.showToast({
        title: '请输入用户名',
        icon: 'none'
      })
      return;
    }
    if (this.data.password === '') {
      wx.showToast({
        title: '请输入密码',
        icon: 'none'
      })
      return;
    }
    wx.request({
      method: 'POST',
      url: app.globalData.baseUrl + '/user/register',
      data: {
        username: that.data.username,
        password: that.data.password,
        repassword: that.data.repassword
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