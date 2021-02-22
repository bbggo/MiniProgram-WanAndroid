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

  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: 'Android极客才看的东西',
      path: '/page/my/my',
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
      path: '/page/my/my',
      imageUrl: 'https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7112a809f22147bd97b31d7f783ea4d5~tplv-k3u1fbpfcp-watermark.image',
    }
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
    var username = wx.getStorageSync('username');
    if (username) {
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

  itemClick: function() {
    var username = wx.getStorageSync('username');
    if (!username) {
      wx.showToast({
        title: '请先登录',
        icon: 'none',
      })
      wx.navigateTo({
        url: '../login/login'
      });
      return;
    }
    wx.navigateTo({
      url: '../mycollect/mycollect'
    });
  },

  loginout: function() {
    that = this;
    var loginUserName = wx.getStorageSync('loginUserName');
    var loginUserPassword = wx.getStorageSync('loginUserPassword');
    var jsessionId = wx.getStorageSync('jsessionId');
    const userSession = loginUserName + ";" + jsessionId + ";" + loginUserPassword;
    wx.request({
      method: "GET",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Cookie': userSession,
      },
      url: app.globalData.baseUrl + '/user/logout/json',
      success(res) {
        that.setData({
          username: '请登录'
        })
        wx.setStorage({
          key: "username",
          data: ''
        })
        wx.setStorage({
          key: "password",
          data: ''
        })
        wx.setStorage({
          key: "userid",
          data: ''
        })
        wx.setStorage({
          key: "loginUserName",
          data: ''
        })
        wx.setStorage({
          key: "loginUserPassword",
          data: ''
        })
        wx.setStorage({
          key: "jsessionId",
          data: ''
        })
        wx.showToast({
          title: '退出成功',
          icon: 'none'
        })
        console.log('logout success', res);
      },
      fail(res) {
        console.log('logout fail', res);
      }
    })
  },

  /**
   * 赞赏支持
   */
  showQrcode() {
    wx.previewImage({
      urls: ['https://real-love-server.oss-cn-shenzhen.aliyuncs.com/tan_love/img/WechatIMG51.jpeg'],
      current: 'https://real-love-server.oss-cn-shenzhen.aliyuncs.com/tan_love/img/WechatIMG51.jpeg' // 当前显示图片的http链接      
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