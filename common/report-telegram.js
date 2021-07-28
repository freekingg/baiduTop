const axios = require("axios");

// 项目名
const projectName = "收录监控";
// 发送消息的api
const telegramApi = {
  production:
    "https://api.telegram.org/bot1454347308:AAGl4wwEQ1M0KJkoxT07guuT6c_WcfCt6Ko/sendMessage",
  development:
    "https://api.telegram.org/bot1454590737:AAHKYThlrKtbDlFj3EpVIlEIPw2jZMLsVtQ/sendMessage",
  local:
    "https://api.telegram.org/bot1454590737:AAHKYThlrKtbDlFj3EpVIlEIPw2jZMLsVtQ/sendMessage",
};
// 发送消息的机器人群组id
const chatId = {
  production: "-464472111",
  development: "1359267342",
  local: "1359267342",
};
const env = "production";
// event为sentry捕获的错误事件对象
const telegram = (data) => {
  return new Promise((resolve) => {
    axios({
      method: "post",
      url: telegramApi[env],
      data: {
        parse_mode: "HTML",
        chat_id: chatId[env],
        text: `
          \n\n<b><u>-- ${projectName} --</u></b>
          \n<b>url: </b><pre>${data.url}-收录了</pre>
          \n<b>数量: </b><pre>${data.result}</pre>
          \n<b>发生时间: </b><pre>${new Date().toLocaleString()}</pre>
        `,
      },
    });
    resolve(true);
  });
};

module.exports = telegram;
