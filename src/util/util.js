/**
 * 工具函数库
 */
import config from '../config'


export function get (url, data) {

  let skey = wx.getStorageSync('weapp_session_F2C224D4-2BCE-4C64-AF9F-A6D872000D1A').skey;
  let header = {};
  if (skey) {
    header = {'x-wx-skey': skey}
  }
  return request(url, 'GET', {}, header)
}
export function post (url, data) {
  let skey = wx.getStorageSync('weapp_session_F2C224D4-2BCE-4C64-AF9F-A6D872000D1A').skey;
  let header = {};
  if (skey) {
    header = {'x-wx-skey': skey}
  }
  return request(url, 'POST', data, header)
}

function request (url, method, data, header = {}) {
  return new Promise((resolve, reject) => {
    wx.request({
      data,
      method,
      header,
      url: url,
      success: function (res) {
        if (res.data.code == 0) {
          resolve(res.data.data)
        } else {
          reject(res.data)
        }
      }
    })
  })
}





  /**
   * 显示失败提示
   * @param  {[type]} title   [抬头标题]
   * @param  {[type]} content [内容]
   * @return {[type]}         [description]
   */
export function showModal(title, content) {
    wx.hideToast();
    wx.showModal({
      title,
      content: JSON.stringify(content),
      showCancel: false
    })
  }

  /**
   * 显示成功提示
   * @param  {[type]} text [description]
   * @return {[type]}      [description]
   */
export function showSuccess(text) {
    wx.showToast({
      title: text,
      icon: 'success'
    })
  }

  /**
   * 显示加载提示
   * @param  {[type]} text [description]
   * @return {[type]}      [description]
   */
 export function showLoading(text) {
    wx.showToast({
      title: text,
      icon: 'loading',
      duration: 10000
    })
  }

