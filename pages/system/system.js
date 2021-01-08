// pages/system/system.js

var that = this;
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    TabCur: 0,
    MainCur: 0,
    dataList:[],
    childDataList: [],
    isLoad: true,
    VerticalNavTop: 0,
    colorArr: [],
    colorCount: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getTree();
  },

  tixiclick: function(event) {
    const id = event.currentTarget.id;
    const childrenindex = event.currentTarget.dataset.childrenindex;
    const name = event.currentTarget.dataset.name;
    const list = event.currentTarget.dataset.children;
    const itemtitle = event.currentTarget.dataset.itemtitle;
    console.log("navigate to search id = ", id, name, childrenindex, itemtitle, list);
    const tabNames = [];
    const tabIds = [];
    for (let i in list) {
      tabNames.push(list[i].name);
      tabIds.push(list[i].id);
    }
    wx.navigateTo({
      url: '../systemlist/systemlist?title=' + itemtitle + '&tabNames=' + tabNames + '&tabIds=' + tabIds,
    })
  },

  getTree: function() {
    that = this;
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: app.globalData.baseUrl + '/tree/json',
      method: 'GET',
      success(res) {
        console.log('request getTree success = ', res.data.data);
        const colors = app.globalData.ColorList;
        console.log("colors = ", colors);
        let list = res.data.data;
        for(var i = 0; i < list.length; i++){
          list[i].id = i
        }
        that.setData({
          dataList: list,
          colorArr: colors,
          colorCount: colors.length
        })
        wx.hideLoading();
      },
      fail(res) {
        console.log('request getTree fail = ', res);
        wx.hideLoading();
      }
    })
  },

  tabSelect: function (event) {
    console.log('event.currentTarget.dataset.id = ', event.currentTarget.dataset.id);
    console.log('event.currentTarget.dataset.index = ', event.currentTarget.dataset.index);
    this.setData({
      TabCur: event.currentTarget.dataset.id,
      MainCur: event.currentTarget.dataset.id,
      VerticalNavTop: (event.currentTarget.dataset.id - 1) * 50
    })
  },

  VerticalMain(e) {
    let that = this;
    let list = this.data.dataList;
    let tabHeight = 0;
    if (this.data.isLoad) {
      for (let i = 0; i < list.length; i++) {
        let view = wx.createSelectorQuery().select("#main-" + list[i].id);
        view.fields({
          size: true
        }, data => {
          console.log('data = ', data);
          list[i].top = tabHeight;
          tabHeight = tabHeight + data.height;
          list[i].bottom = tabHeight;
        }).exec();
      }
      that.setData({
        isLoad: false,
        list: list
      })
    }
    let scrollTop = e.detail.scrollTop + 20;
    for (let i = 0; i < list.length; i++) {
      if (scrollTop > list[i].top && scrollTop < list[i].bottom) {
        that.setData({
          VerticalNavTop: (list[i].id - 1) * 50,
          TabCur: list[i].id
        })
        return false
      }
    }
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