const fs = require('fs');

function updateInventory(batchSize = 100) {
  const inventory = JSON.parse(fs.readFileSync('./data/inventory.json'));
  
  for (let i = 0; i < inventory.length; i += batchSize) {
    const batch = inventory.slice(i, i + batchSize);
    
    batch.forEach(item => {
      item.stock += 10;
    });

    console.log(`Batch ${Math.floor(i / batchSize) + 1} of inventory updated.`);
  }

  fs.writeFileSync('./data/inventory.json', JSON.stringify(inventory, null, 2));
}

module.exports = updateInventory;
