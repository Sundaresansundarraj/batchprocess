const fs = require('fs');
const { sendEmail, sendSMS } = require('../services/notificationService');

async function processOrders(batchSize = 100) {
  const orders = JSON.parse(fs.readFileSync('./data/orders.json'));
  const inventory = JSON.parse(fs.readFileSync('./data/inventory.json'));
  
  for (let i = 0; i < orders.length; i += batchSize) {
    const batch = orders.slice(i, i + batchSize);
    
    batch.forEach(order => {
      const item = inventory.find(product => product.product === order.product);
      if (item) {
        item.stock -= order.quantity;
      }
    });

    await Promise.all(batch.map(order => {
      return Promise.all([
        sendEmail(order.customerEmail, 'Order Confirmation', `Your order ${order.orderId} has been processed.`),
        sendSMS(order.customerPhone, `Your order ${order.orderId} has been processed.`)
      ]);
    }));

    console.log(`Batch ${Math.floor(i / batchSize) + 1} of orders processed.`);
  }

  fs.writeFileSync('./data/inventory.json', JSON.stringify(inventory, null, 2));
}

module.exports = processOrders;
