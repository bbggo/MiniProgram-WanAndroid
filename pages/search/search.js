// pages/search/search.js
var that = this;
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    title: '',
    pageNo: 0,
    isLoad: false,
    pageList: [],
    pageTitleList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    that.setData({
        title: options.name
      }),
      that.data.id = options.id
    this.queryList();
  },

  queryList: function () {
    that = this
    wx.request({
      url: app.globalData.baseUrl + '/article/query/' + that.data.pageNo + '/json',
      method: 'POST',
      data: {
        k: that.data.title
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        console.log('request queryList success = ', res);
        var templist = that.data.pageList
        var resultlist = templist.concat(res.data.data.datas)
        that.setData({
          pageList: resultlist
        })

        //取出标题中的html标签
        let titles = []
        console.log("pageList = ", that.data.pageList)
        for (var i in that.data.pageList) {
          var title = that.data.pageList[i].title
          console.log("title = ", title);
          //替换掉html标签,全局替换
          title = title.replace(/<[^>]+>/g, "")
          //替换汉字符号,全局替换
          title = title.replace(/&amp;/g, "、")
          title = title.replace(/&mdash;/g, "-")
          console.log("title = ", title);
          //将替换过的标题添加到新数组
          titles.push(title)
        }
        that.setData({
          isLoad: false,
          pageTitleList: that.data.pageTitleList.concat(titles)
        })
      },
      fail(res) {
        console.log('request queryList fail = ', res);
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
    that.setData({
      isLoad: true,
      pageNo: that.data.pageNo + 1
    });
    this.queryList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})