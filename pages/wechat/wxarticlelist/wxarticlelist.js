// pages/wechat/wxarticlelist/wxarticlelist.js

var that = this;
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    title: '',
    pageNo: 1,
    isLoad: false,
    articleList: [],
    keyword: '',
    isClearKeyword: false
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    that.data.id = options.id;
    console.log('id = ', that.data.id);
    that.setData({
      title: options.name,
      search: this.search.bind(this),
      selectResult: this.selectResult.bind(this),
      input: this.input.bind(this),
      clearInput: this.clearInput.bind(this)
    })
    wx.showLoading({
      title: '加载中...',
    })
    that.getWxArticleList();
  },

  getWxArticleList: function () {
    that = this;
    var url = app.globalData.baseUrl + '/wxarticle/list/' + that.data.id +
    '/' + that.data.pageNo + '/json';

    if (that.data.keyword !== '') {
      url = app.globalData.baseUrl + '/wxarticle/list/' + that.data.id +
      '/' + that.data.pageNo + '/json?k=' + that.data.keyword
    }

    console.log('url = ', url);

    wx.request({
      url: url,
      success(res) {
        console.log('success = ', res.data.data)
        var list = res.data.data.datas
        var dataList = that.data.articleList
        var resultList = []
        if (that.data.keyword === '') {
          if (that.data.isClearKeyword) {
            resultList = list
          } else {
            resultList = dataList.concat(list)
          }
        } else {
          resultList = list
        }
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
        console.log('request getWxArticleList error', res);
        wx.hideLoading();
      }
    })
  },

  /**
   * 输入过程中的提示
   * @param {}} value 
   */
  search: function (value) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('setTimeout')
        resolve([{
          text: '搜索结果',
          value: 1
        }, {
          text: '搜索结果2',
          value: 2
        }])
      }, 200)
    })
  },

  selectResult: function (e) {
    console.log('select result', e.detail)
  },

  input: function (e) {
    console.log(e.detail.value);
    that.data.keyword = e.detail.value;
    this.getWxArticleList();
  },
  
  clearInput: function (e) {
    that.data.keyword = ''
    that.data.pageNo = 1
    that.data.isClearKeyword = true
    this.getWxArticleList();
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
    that = this;
    that.setData({
      isLoad: true,
      pageNo: that.data.pageNo + 1
    });
    this.getWxArticleList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})