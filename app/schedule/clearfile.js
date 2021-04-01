module.exports = {
    schedule: {
      interval: '48h', // 48小时间隔 定时清理 存储pdf的文件夹
      type: 'all', // 指定所有的 worker 都需要执行
    },
    async task(ctx) {
      ctx.helper.deleteFiles("/var/www/pdfdist");    
    },
  };