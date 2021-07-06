const request = require('request')

// 查询条件，去除没有值的key
function Invalid(params = {}) {
    let obj = {};
    Object.keys(params).map(item => {
        if (
            params[item] !== null &&
            params[item] !== undefined &&
            params[item] !== ''
        ) {
            obj[item] = params[item];
        }
    });
    return obj
}


// 分页处理
function Paging({ page = 1, size = 10 }) {
    let obj = {
        page: Math.max(page * 1, 1) - 1,
        size: Math.max(size * 1, 1),
    };
    return obj
}

let checkProxy = function(proxy, headers) {
    return new Promise((resolve, reject) => {
      request(
        {
          // 检测网址为百度的某个js文件，速度快，文件小，非常适合作为检测方式
          url: 'http://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js',
          proxy: `http://${proxy.ip}:${proxy.port}`,
          method: 'GET',
          timeout: 8000,
        },
        function(err, response, body) {
          if (!err && response.statusCode === 200) {
            // console.log(proxy.ip + ' 链接成功：')
            resolve(true)
          } else {
            // console.log(proxy.ip + ' 链接失败')
            resolve(false)
          }
        },
      )
    })
  }

module.exports = { Invalid, Paging,checkProxy }