const cron = require('cron');
const generateReports = require('../scripts/generateReports');

const generateReportsJob = new cron.CronJob('0 4 * * *', () => {
  console.log('Generating reports...');
  generateReports();
});

module.exports = generateReportsJob;
