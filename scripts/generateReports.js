const fs = require('fs');

function generateReports() {
  const orders = JSON.parse(fs.readFileSync('./data/orders.json'));

  const dailySales = {};
  orders.forEach(order => {
    const date = order.date;
    if (!dailySales[date]) {
      dailySales[date] = 0;
    }
    dailySales[date] += order.price * order.quantity;
  });

  console.log('Daily Sales Report:', dailySales);

  fs.writeFileSync('./data/daily_sales_report.json', JSON.stringify(dailySales, null, 2));
}

module.exports = generateReports;

