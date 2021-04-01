'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/pdf/finish', controller.pdf.end);
  router.post('/pdf/execute', controller.pdf.execute);
  router.get('/pdf/delete', controller.pdf.delfiles)
};
