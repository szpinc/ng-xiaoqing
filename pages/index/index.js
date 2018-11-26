var api = require('../../config/api.js');

//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    window_height: '',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    banners: [],
    comments: [],
    page: 0,
    size: 10
  },
  //下拉监听
  onPullDownRefresh: function() {

    //获取评论列表
    wx.request({
      url: api.comment_list_url,
      data: {
        page: 0,
        size: that.data.size
      },
      success: function(res) {
        if (res.data.code == 0) {
          that.setData({
            comments: res.data.data.comments,
            page: that.data.page + 1
          });
        }
      }
    })
  },
  // `分享信息处理`
  onShareAppMessage: function() {
    return {
      title: '南昌工学院30周年校庆校友留言',
      desc: '大家快来为母校送上祝福吧',
      path: '/pages/index/index'
    }
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function() {
    let that = this;
    //获取系统高度
    wx.getSystemInfo({
      success: function(res) {
        //  console.info(res.windowHeight);
        that.setData({
          window_height: res.windowHeight
        });
      },
    });
    //获取轮播图数据
    wx.request({
      url: api.brand_url,
      success: function(res) {
        if (res.data.code == 0) {
          that.setData({
            banners: res.data.data.banners
          });
        }
      }
    })

    //获取评论列表
    wx.request({
      url: api.comment_list_url,
      data: {
        page: 0,
        size: that.data.size
      },
      success: function(res) {
        if (res.data.code == 0) {
          that.setData({
            comments: res.data.data.comments,
            page: that.data.page + 1
          });
        }
      }
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  goToCommentPage: function(e) {
    var that = this;
    wx.getUserInfo({
      success: function(res) {
        that.setData({
          nickName: res.userInfo.nickName,
          avatarUrl: res.userInfo.avatarUrl,
        });
        console.info(res.userInfo.nickName);
        console.info(res.userInfo.avatarUrl);

        wx.navigateTo({
          url: '/pages/comment/comment',
        })
      }

    });
  },
  lower: function() {
    let that = this;
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: api.comment_list_url,
      data: {
        page: that.data.page,
        size: that.data.size
      },
      success: function(res) {
        wx.hideLoading();
        var comments_new = that.data.comments.concat(res.data.data.comments);
        setTimeout(() => {
          that.setData({
            comments: comments_new,
            page: that.data.page + 1
          });
        });
      }

    })
  }
})