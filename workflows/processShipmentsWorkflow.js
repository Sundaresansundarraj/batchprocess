const cron = require('cron');
const processShipments = require('../scripts/processShipments');

const processShipmentsJob = new cron.CronJob('0 2 * * *', () => {
  console.log('Processing shipments...');
  processShipments();
});

module.exports = processShipmentsJob;
