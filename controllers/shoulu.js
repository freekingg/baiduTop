
let current = []

const search = require("./search")
const getCookie = require("./get-resources")


class Shoulu {
  async create(ctx) {
    current = []
    const { urls } = ctx.request.body;
    console.log('urls',urls);


    var oparray = [];
    var res = urls;
    res = res.replace(/^\n*/, "");
    res = res.replace(/\n{2,}/g, "\n");
    res = res.replace(/\n*$/, "");
    oparray = res.split("\n");

    if(urls){

    }

    console.log('全部完成了');
    ctx.body = {
      code: 0,
      data: '添加成功',
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