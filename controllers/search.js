const axios = require("axios");

const getOne = async (url) => {
  let result = ''
  try {
    let res = await axios({
      method: "get",
      headers: {
        Referer: "http://seo.iis7.com/?1627462543796.html",
        cookie:'PHPSESSID=kf4dflkg10ogsqdvudpjtrgrq4;user_bs=%5B%5D;Hm_lvt_ae9e9da8a091a818d7b59b977cc9295d=1627460910;__51cke__=; tttt=ATEPYwRmVDdcNAAxU2EIYFBmVT4=; __tins__18826624=%7B%22sid%22%3A%201627460910287%2C%20%22vd%22%3A%202%2C%20%22expires%22%3A%201627464346827%7D; __51laig__=2; Hm_lpvt_ae9e9da8a091a818d7b59b977cc9295d=1627462547'
      },
      url: `http://seo.iis7.com/api.php?act=getData&url=${url}&item=bd_tsl&spider=&random=442`,
    });
    result = res.data
  } catch (error) {
    result = ''
  }
  return result
};

const search = async (url) => {
  let r = await  getOne(url)
  console.log('r1',r);
  if(r.bd_tsl === ''){
    let r2 = await  getOne(url)
    console.log('r2',r2);
    return r2.bd_tsl
  }
};

module.exports = search;
