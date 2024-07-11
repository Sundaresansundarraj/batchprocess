const updateCustomerRecordsJob = require('./workflows/updateCustomerRecordsWorkflow');
const processOrdersJob = require('./workflows/processOrdersWorkflow');
const updateInventoryJob = require('./workflows/updateInventoryWorkflow');
const processPaymentsJob = require('./workflows/processPaymentsWorkflow');
const processShipmentsJob = require('./workflows/processShipmentsWorkflow');
const generateReportsJob = require('./workflows/generateReportsWorkflow');
const consumeMessages = require('./rabbitmq/consumer');
const produceMessage = require('./rabbitmq/producer');
require('dotenv').config();

updateCustomerRecordsJob.start();
processOrdersJob.start();
updateInventoryJob.start();
processPaymentsJob.start();
processShipmentsJob.start();
generateReportsJob.start();

const sampleOrder = { orderId: 1, customerId: 1, product: 'Phone', quantity: 2, price: 15, date: '2023-07-10',customerPhone: "+919159231586" };
produceMessage('order-data', sampleOrder);


const processOrderMessage = async (order) => {
  console.log(`Processing order ${order.orderId}`);
};
consumeMessages('order-data', processOrderMessage);

console.log('Batch processing system started.');

