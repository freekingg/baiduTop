const { Invalid, Paging, checkProxy } = require("../common/utils");
const { Cluster } = require("puppeteer-cluster");

const launchOptions = {
  headless: false,
  ignoreHTTPSErrors: true, // 忽略证书错误
  args: [
    "--disable-gpu",
    "--disable-dev-shm-usage",
    "--disable-web-security",
    "--disable-xss-auditor", // 关闭 XSS Auditor
    "--no-zygote",
    "--no-sandbox",
    "--disable-setuid-sandbox",
    "--allow-running-insecure-content", // 允许不安全内容
    "--disable-webgl",
    "--disable-popup-blocking",
    "--disable-infobars",
    // `--proxy-server=${newProxyUrl}`, // 配置代理
    // `--proxy-server=180.109.144.18:4254`, // 配置代理
  ],
};

const clusterLanuchOptions = {
  concurrency: Cluster.CONCURRENCY_CONTEXT,
  maxConcurrency: 6, // 并发的workers数
  retryLimit: 2, // 重试次数
  skipDuplicateUrls: true, // 不爬重复的url
  monitor: false, // 显示性能消耗
  puppeteerOptions: launchOptions,
};

const getIp = async (ips) => {
  return new Promise(async (resolve) => {
    if (ips.length === 0) {
      resolve("noProxy");
      return;
    }
    // 随机数下标
    const randomNo = Math.floor(Math.random() * ips.length);
    const current = ips[randomNo];

    const enabled = await checkProxy(current);
    if (!enabled) {
      ips.splice(randomNo, 1);
      if (!ips.length || status) {
        console.log("没有任何可以使用的代理ip");
        resolve("noProxy");
        return;
      }
      getIp(ips);
      console.log(`代理ip: ${current.ip} 不可用 - 继续检测其它代理ip`);
    } else {
      console.log("检测到当前可用ip", current);
      resolve(current);
    }
  });
};

let url = "https://www.baidu.com";

class Bd {
  async create(ctx) {
    const cluster = await Cluster.launch(clusterLanuchOptions);
    const { kws } = ctx.request.body;
    let content = [];
    await cluster.task(async ({ page, data: kw }) => {
      await page.setUserAgent(
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36"
      );

      //   const proxy = await getIp(ips, win);
      //   if (proxy !== "noProxy") {
      //     await useProxy(page, `http://${proxy.ip}:${proxy.port}`);
      //     useProxy.lookup(page).then((data) => {
      //       console.log("当前使用ip", `当前使用ip-${data.ip}`);
      //     });
      //   }

      // 随机数下标
      const times = [1000, 2000, 3000, 4000];
      const randomNo = Math.floor(Math.random() * times.length);
      const currentTime = times[randomNo];
      await page.waitForTimeout(currentTime);

      try {
        await page.goto(url, { timeout: 30000 });
        const inputArea = await page.$("#kw");
        await inputArea.type(`${kw}`, 5000);
        await page.click("#su");

        await page.waitForSelector("#container", { timeout: 30000 });
        await page.waitForTimeout(3000);

        let p1Data = await loadContent();
        console.log("p1Data", p1Data);
        await page.waitForTimeout(3000);

        for (let index = 1; index <= 5; index++) {
          console.log("index", index);
          let pageDoms = await page.$$(
            "#wrapper_wrapper > #page .page-inner .pc"
          );
          await pageDoms[index].click();
          await page.waitForTimeout(3000);

          let p2Data = await loadContent();
          content.push(p2Data);
          console.log(`第${index + 1}页`);
          await page.waitForTimeout(3000);
        }
      } catch (error) {
        console.log("打开网页出错", url, error);
      }

      //   获取内容
      function loadContent(kw) {
        return page.evaluate((kw) => {
          const titles = [
            ...document.querySelectorAll(".result.c-container.new-pmd .t a"),
          ];
          const links = [
            ...document.querySelectorAll(
              ".result.c-container.new-pmd a.c-showurl"
            ),
          ];

          let result = titles.map((item, index) => {
            return {
              kw,
              index,
              title: item.innerText,
              titleLink: item.href,
              link: links[index] && links[index].innerText,
            };
          });

          return result;
        }, kw);
      }
    });

    // 队列执行任务
    console.log("kws", kws);
    for (const iterator of kws) {
      cluster.queue(iterator);
    }

    await cluster.idle();
    await cluster.close().then((res) => {
      console.log("全部完成,关闭");
      ctx.body = {
        code: 0,
        data: content,
      };
    });
  }
}

module.exports = new Bd();
