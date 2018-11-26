var api = require('../../config/api.js');

var app = getApp()
Page({
  data: {
    // models: []
    content: '',
    value: '',
    models: []
  },
  comment_value: function(e){
      this.setData({
        content: e.detail.value,
      });
  },
  onLoad: function() {
    let that = this;
    console.info("页面加载");
    //获取评论模板数据
    wx.request({
      url: api.comment_model_list_url,
      success: function(res) {
        if (res.data.code == 0) {
          that.setData({
            models: res.data.data.models
          });
        }
      },
      fail: function() {
        wx.showToast({
          title: '获取评论模板失败',
          image: '/images/error_msg.png'
        })
      }
    })

  },

  //监听提交事件
  submit: function() {
    console.info(this.data.content);
    var content = this.data.content;
    
    var userInfo = app.globalData.userInfo;
    console.info(userInfo);

    //像服务器发送请求
    wx.request({
      url: api.comment_post_url,
      header: {
        'content-type': 'application/json' // 默认值
      },

      data: {
        'username': userInfo.nickName,
        'headUrl': userInfo.avatarUrl,
        'content': content
      },
      method: 'POST',
      success: function(res) {
        if (res.data.code == 0) {
          wx.showToast({
            title: '提交成功',
          });
          wx.redirectTo({
            url: '/pages/index/index',
          })
        } else {
          wx.showToast({
            title: '提交失败',
            image: '/images/error_msg.png'
          })
        }
      }
    })


  },

  selectClick: function(e) {
    let that = this;
    for (var i = 0; i < that.data.models.length; i++) {
      if (e.currentTarget.id == that.data.models[i].id) {
        that.data.models[i].is_show = true;
      } else {
        that.data.models[i].is_show = false;
      }
    }
    var content_str = e.target.dataset.content;
    // that.data.content = content_str;
    that.data.content = content_str;
    this.setData(that.data);
  }



})