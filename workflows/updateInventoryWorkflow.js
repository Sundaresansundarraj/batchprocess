const cron = require('cron');
const updateInventory = require('../scripts/updateInventory');

const updateInventoryJob = new cron.CronJob('0 3 * * *', () => {
  console.log('Updating inventory...');
  updateInventory();
});

module.exports = updateInventoryJob;
