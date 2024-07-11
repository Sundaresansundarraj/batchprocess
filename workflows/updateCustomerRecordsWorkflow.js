const cron = require('cron');
const updateCustomerRecords = require('../scripts/updateCustomerRecords');

const updateCustomerRecordsJob = new cron.CronJob('0 0 * * *', () => {
  console.log('Updating customer records...');
  updateCustomerRecords();
});

module.exports = updateCustomerRecordsJob;
