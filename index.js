const fs = require("fs")
const schedule = require('node-schedule');

const search = require("./controllers/search")
const getCookie = require("./controllers/get-resources")
const telegram = require("./common/report-telegram")



const get = async (urls)=>{
  let list = []
  var oparray = [];
  var res = urls.toString();
  res = res.replace(/^\n*/, "");
  res = res.replace(/\n{2,}/g, "\n");
  res = res.replace(/\n*$/, "");
  oparray = res.split("\n");
  
  const urls2 = oparray;
  console.log('urls2: ', urls2);
  
  let cookie =  await getCookie(urls)
      console.log('cookie: ', cookie);
  
  for (const url of urls2) {
    let result =  await search(url,cookie)
    console.log('result: ', result);
    list.push({url,result})
  }

  console.log('全部完成了',list);
  for (const iterator of list) {
    if(iterator.result && +iterator.result !== 0){
      await telegram(iterator)
    }
  }
}


//每1小时定时执行一次:
schedule.scheduleJob('30 1 * * * *',()=>{
  console.log('scheduleCronstyle:' + new Date());
  let urls = fs.readFileSync('./urls.txt')
  get(urls)
}); 


