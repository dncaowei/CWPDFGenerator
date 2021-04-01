'use strict';

const Controller = require('egg').Controller;
const fs = require('fs')
class PdfController extends Controller {
  async open() {
    const { ctx } = this;
    ctx.body = await ctx.service.pdf.open()
  }

  async end() {
    const { ctx } = this;
    ctx.body = "end"
  }

  async execute() {
    const { ctx } = this;
    let fileJson = await ctx.service.pdf.execute()
    ctx.attachment(fileJson.realpath);
    ctx.set('Content-Type', 'application/octet-stream')
    ctx.body = fs.createReadStream(fileJson.realpath)
  }

  async delfiles(){
    const {ctx } = this;
    ctx.helper.deleteFiles("/var/www/pdfdist");
    ctx.body = "删除完成"
  }
}

module.exports = PdfController;
