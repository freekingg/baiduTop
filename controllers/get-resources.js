const puppeteer = require('puppeteer')
const { URL } = require('url')
const path = require('path')


let resultArr = []

const clone = async (urls) => {
  return new Promise(async resolve => {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    })
    const page = await browser.newPage()
    await page.setViewport({
      width: 1920,
      height: 700,
    })

    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36');

    let p = await page.goto('http://seo.iis7.com/', {
      waitUntil: 'load',
      timeout:60000,
    })

    const inputArea = await page.$("#urls");
    await inputArea.type(`${urls}`, 600);
    await page.click("#lbd_tsl");
    await page.waitForTimeout(1000);
    await page.click("#search_btn");
    await page.waitForTimeout(3000);
    let cookies = await page.cookies()
    await page.waitForTimeout(1000);


    // await page.waitForSelector("#container", { timeout: 30000 });

    console.log('cookies获取完成');
    let cookie = ''
    cookies.map(item=>{
      cookie+=`${item.name}=${item.value}; `
    })
    resolve(cookie)
    await browser.close()

   
  })
}
module.exports = clone;