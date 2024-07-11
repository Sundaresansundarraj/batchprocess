const fs = require('fs');

function updateCustomerRecords(batchSize = 100) {
  const customers = JSON.parse(fs.readFileSync('./data/customers.json'));
  
  for (let i = 0; i < customers.length; i += batchSize) {
    const batch = customers.slice(i, i + batchSize);
    
    batch.forEach(customer => {
      customer.address = customer.address + " Apt 101"; 
    });

    console.log(`Batch ${Math.floor(i / batchSize) + 1} of customer records updated.`);
  }

  fs.writeFileSync('./data/customers.json', JSON.stringify(customers, null, 2));
}

module.exports = updateCustomerRecords;
