// pages/hot/hot.js
var that = this;
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 随机颜色数组
    colorArr: ["#0000FF", "#008B00", "#FFC125", "#FF6A6A", "#FF1493", "#8A2BE2", "#EE1289", "#32CD32"],
    hotList: [],
    webList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getHotList();
    this.getWebList();
  },

  getHotList: function() {
    that = this;
    wx.request({
      url: app.globalData.baseUrl + '/hotkey/json',
      success(res) {
        console.log('success = ', res.data.data)
        that.setData({
          hotList: res.data.data
        })
      },
      fail(res) {
        console.log('request getHotList error', res);
      }
    })
  },

  getWebList: function() {
    wx.request({
      url: app.globalData.baseUrl + '/friend/json',
      success(res) {
        console.log('success = ', res.data.data)
        that.setData({
          webList: res.data.data
        })
      },
      fail(res) {
        console.log('request getWebList error', res);
      }
    })
  },

  itemClick: function(event) {
    const id = event.currentTarget.id;
    const name = event.currentTarget.dataset.name;
    console.log("navigate to search id = ", id, name)
    wx.navigateTo({
      url: '../search/search?key=' + id +'&name=' + name,
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