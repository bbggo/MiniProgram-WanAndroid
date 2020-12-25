// pages/wechat/wechat.js

const app = getApp()
var that = this;

Page({

  /**
   * 页面的初始数据
   */
  data: {

    elements: [],
    colors: [
      'cyan',
      'blue',
      'purple',
      'mauve',
      'pink',
      'brown',
      'red',
      'orange',
      'olive',
      'green',
      'blue',
      'purple',
      'red',
      'pink',
  ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // that = this;
    this.getWeChatList();
  },

  getWeChatList: function () {
    that = this;
    wx.request({
      url: app.globalData.baseUrl + '/wxarticle/chapters/json',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data.data)
        const list = res.data.data;
        const listData = [];
        console.log(that.data.colors);
        for (var i = 0; i < list.length; i++) {
          listData.push({
            name: list[i].name,
            color: that.data.colors[i],
            id: list[i].id
          });
        }
        console.log(listData);
        that.setData({
          elements: listData
        })
      },
      fail(res) {
        console.log('getWeChatList error', res);
      }
    })
  },

  itemClick: function(event) {
    const id = event.currentTarget.id;
    const index = event.currentTarget.dataset.index;
    const name = event.currentTarget.dataset.name;
    console.log('id=', id);
    console.log('index=', index);
    console.log('name=', name);
    wx.navigateTo({
      url: './wxarticlelist/wxarticlelist?id=' + id + '&name=' + name,
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