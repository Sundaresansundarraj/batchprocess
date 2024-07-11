const fs = require('fs');

function processPayments(batchSize = 100) {
  const payments = JSON.parse(fs.readFileSync('./data/payments.json'));
  
  for (let i = 0; i < payments.length; i += batchSize) {
    const batch = payments.slice(i, i + batchSize);
    
    batch.forEach(payment => {
     
      console.log(`Processing payment ${payment.paymentId} for order ${payment.orderId}`);
    });

    console.log(`Batch ${Math.floor(i / batchSize) + 1} of payments processed.`);
  }
}

module.exports = processPayments;
