'use strict';

const Service = require('egg').Service;
const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs')
const url = require('url')
const _ = require('lodash')
class PdfService extends Service {
  async open(toUrl, projectName, fileName) {
    const { ctx } = this
    let pdfPath = '/var/www/pdfdist/'+projectName+"/"
    let isExists =  await fs.existsSync(pdfPath)
    if(!isExists){
          fs.mkdirSync(pdfPath)
    }
    
    let browser = await puppeteer.launch({
        ignoreHTTPSErrors : true,
        args:[
          '--no-sandbox',
          '–disable-gpu',
          '–disable-dev-shm-usage',
          '–disable-setuid-sandbox',
          '–no-first-run',
          '–no-sandbox',
          '–no-zygote',
          '–single-process'
          ],
        //headless :false
      });
    let page = await browser.newPage();
    page.setDefaultNavigationTimeout(1000000)
    
    await page.on('response',async response => {
        let pos = response.url().indexOf('finish')
         if(pos != -1 ){
           const endURL = new URL(response.url());
           let pdfName = fileName + '.pdf'
           let gpath = pdfPath +pdfName
           await page.waitFor(500);
           await page.pdf({path:gpath,format:"a4",preferCSSPageSize:true,printBackground:true});
           console.log('pdf gennn inner')
           await browser.close();
         }
    })
    await page.goto(toUrl , {waitUntil: 'networkidle2'})
    await page.waitFor(500);
    await page.evaluate(()=>window.scrollTo(0, document.body.scrollHeight));
    //let gpath = 
    //await page.pdf({path:gpath,format:"a4",preferCSSPageSize:true,printBackground:true});
    return {
      code : 200,
      pdfpath : pdfPath + fileName
    }
  }
  
  async uploadfile() {
        
  }
 
  async delay(t, val) {
    return new Promise(function(resolve) {
        setTimeout(function() {
            resolve(val);
        }, t);
    });
 }

  async execute(){
    const { ctx } = this
 
    let fileName = ctx.request.body.filename
    let project = ctx.request.body.project
    let toUrl = ctx.request.body.url
    if (!project || !toUrl || !fileName) {
      return {
        code : 402,
        message : "请求参数错误",
      }
    }

    if(fs.existsSync('/var/www/pdfdist/'+project+"/" + fileName + '.pdf')){

      return {
        code : 200,
        message : "截图成功",
        realpath:'/var/www/pdfdist/' + project + "/" + fileName + ".pdf",
        
      }
    }
  
    let result = await ctx.service.pdf.open(toUrl, project, fileName)
    let flag = 0
    for(let i = 0 ; i < 120 ; i++){   
      if(fs.existsSync(result.pdfpath + '.pdf')){
          flag = 1
          break
      }
      await ctx.service.pdf.delay(3000);
        
    }
    if(flag){
      return {
        code : 200,
        message : "截图成功",
        realpath:'/var/www/pdfdist/' + project + "/" + fileName + ".pdf"
      }
    }
    return {
      code : 401,
      message : "截图失败",
      realpath : "/var/www/pdferror.txt"
    }

    
  }

}

module.exports = PdfService;
