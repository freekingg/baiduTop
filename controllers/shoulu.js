
let current = []

const search = require("./search")


class Shoulu {
  async create(ctx) {
    current = []
    const { urls } = ctx.request.body;
    console.log('urls',urls);

    for (const url of urls) {
      let result =  await search(url)
      console.log('result: ', result);
      current.push({url,bd_tsl:result})
    }

    console.log('全部完成了');
    ctx.body = {
      code: 0,
      data: current,
    };
  }

  async progress(ctx) {
    ctx.body = {
      code: 0,
      data: current
    };
  }
}

module.exports = new Shoulu();