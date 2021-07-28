const axios = require("axios");
let count = 0
const getOne = async (url,Cookie) => {
  // console.log('url',url);
  count++
  let result = ''
  try {
    let res = await axios({
      method: "get",
      headers: {
        Referer: "http://seo.iis7.com/",
        Cookie
      },
      url: `http://seo.iis7.com/api.php?act=getData&url=${url}&item=bd_tsl&spider=&random=442`,
    });
    result = res.data
  } catch (error) {
    console.log('error',error);
    result = ''
  }
  return result
};

const search = async (url,cookie) => {
  let r1 = await getOne(url,cookie)
  if(!r1.bd_tsl){
    r1 = await getOne(url,cookie)
  }
  if(!r1.bd_tsl){
    r1 = await getOne(url,cookie)
  }
  if(!r1.bd_tsl){
    r1 = await getOne(url,cookie)
  }
  console.log('r1',r1);
  return r1.bd_tsl || ''
};

module.exports = search;
