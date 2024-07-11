const cron = require('cron');
const processPayments = require('../scripts/processPayments');

const processPaymentsJob = new cron.CronJob('0 1 * * *', () => {
  console.log('Processing payments...');
  processPayments();
});

module.exports = processPaymentsJob;
