const cron = require('cron');
const processOrders = require('../scripts/processOrders');

const processOrdersJob = new cron.CronJob('0 * * * *', () => {
  console.log('Processing orders...');
  processOrders();
});

module.exports = processOrdersJob;
