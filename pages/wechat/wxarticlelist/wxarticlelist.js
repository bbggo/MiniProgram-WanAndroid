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

    var loginUserName = wx.getStorageSync('loginUserName');
    var loginUserPassword = wx.getStorageSync('loginUserPassword');
    var jsessionId = wx.getStorageSync('jsessionId');
    const userSession = loginUserName + ";" + jsessionId + ";" + loginUserPassword;

    wx.request({
      url: url,
      method: 'GET',
      header: {
        'content-type': 'application/json', // 默认值
        'Cookie': userSession
      },
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

  collect: function(event) {
    const postion = event.currentTarget.id
    const page = this.data.articleList[postion];

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
      url: app.globalData.baseUrl + '/lg/collect/' + page.id + '/json',
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
        that.data.articleList[postion].collect = true;
        that.setData({
          articleList: that.data.articleList
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
  },

  CopyLink(e) {
    wx.setClipboardData({
      data: e.currentTarget.dataset.link,
      success(res) {
        wx.showToast({
          icon: 'none',
          title: '已复制，请在手机浏览器中打开',
          duration: 2000
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