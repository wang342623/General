export default function request(method = 'GET', url, data = {}, options = {}) {
  return new Promise((resolve, reject) => {
    // 显示加载动画
    uni.showLoading({ mask: true })

    // 合并默认配置和用户传入的options
    const requestOptions = {
      url,
      method,
      data,
      header: {
        'content-type': method === 'POST' ? 'application/x-www-form-urlencoded' : ''
      },
      ...options
    }

    // 发起请求
    uni.request({
      ...requestOptions,
      success: (res) => {
        if (res.statusCode === 200) {
          resolve(res.data)
        } else {
          reject(new Error(`请求失败，状态码：${res.statusCode}`))
        }
      },
      fail: (err) => {
        reject(err)
      },
      complete: () => {
        // 隐藏加载动画
        uni.hideLoading()
      }
    })
  })
}

