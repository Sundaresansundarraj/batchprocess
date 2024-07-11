const fs = require('fs');

function processShipments(batchSize = 100) {
  const shipments = JSON.parse(fs.readFileSync('./data/shipments.json'));
  
  for (let i = 0; i < shipments.length; i += batchSize) {
    const batch = shipments.slice(i, i + batchSize);
    
    batch.forEach(shipment => {
      console.log(`Processing shipment ${shipment.shipmentId} for order ${shipment.orderId}`);
    });

    console.log(`Batch ${Math.floor(i / batchSize) + 1} of shipments processed.`);
  }
}

module.exports = processShipments;
