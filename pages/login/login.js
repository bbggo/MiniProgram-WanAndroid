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

  loginusername: function (e) {
    this.setData({
      username: e.detail
    })
  },

  loginpassword: function (e) {
    this.setData({
      password: e.detail
    })
  },

  clicklogin: function () {
    that = this;
    console.log('username = ', this.data.username);
    wx.showK
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
    wx.showLoading({
      title: '正在登录...',
    })
    wx.request({
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      url: app.globalData.baseUrl + '/user/login',
      data: {
        username: this.data.username,
        password: this.data.password,
      },
      success(res) {
        wx.hideLoading();
        console.log('login success = ', res, that.data.username);
        let tempPage = getCurrentPages(); // 当前页变量
        let prevPage = tempPage[tempPage.length - 2]; // 上一页变量
        // 这里给要打开的页面传递数据.
        that.data.username =  that.data.username//新生成的数据，加到数据头 传给前一页
        prevPage.setData({
          username: that.data.username, //对前一页数据渲染
        })
        wx.setStorage({
          key: "username",
          data: res.data.data.username
        })
        wx.setStorage({
          key: "password",
          data: that.data.password
        })
        wx.setStorage({
          key: "userid",
          data: res.data.data.id
        })
        console.log('res.cookies', res.cookies[0].split(";")[0], 
        res.cookies[1].split(";")[0], res.cookies[2].split(";")[0]);
        wx.setStorage({
          key: "loginUserName",
          data: res.cookies[1].split(";")[0]
        })
        wx.setStorage({
          key: "loginUserPassword",
          data: "loginUserPassword=" + that.data.password
        })
        wx.setStorage({
          key: "jsessionId",
          data: res.cookies[0].split(";")[0]
        })
        wx.navigateBack({
          delta: 1,
        })
      },
      fail(res) {
        wx.hideLoading();
        console.log('login fail = ', res);
      }
    })
  },

  clickregister: function () {
    that = this;
    console.log('username = ', this.data.username);
    wx.showK
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
    wx.showLoading({
      title: '正在注册...',
    })
    wx.request({
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      url: app.globalData.baseUrl + '/user/register',
      data: {
        username: this.data.username,
        password: this.data.password,
        repassword: this.data.password
      },
      success(res) {
        wx.hideLoading();
        console.log('register success = ', res);
        that.clicklogin();
      },
      fail(res) {
        wx.hideLoading();
        console.log('register fail = ', res);
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