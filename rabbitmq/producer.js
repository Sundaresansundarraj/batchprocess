const amqp = require('amqplib/callback_api');
require('dotenv').config();
const RABBITMQ = process.env.RABBITMQ

const produceMessage = (queue, message) => {
  amqp.connect(RABBITMQ, (error0, connection) => {
    if (error0) {
      throw error0;
    }
    connection.createChannel((error1, channel) => {
      if (error1) {
        throw error1;
      }
      channel.assertQueue(queue, {
        durable: false
      });
      channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
      console.log(`[x] Sent ${JSON.stringify(message)}`);
    });

    setTimeout(() => {
      connection.close();
    }, 500);
  });
};

module.exports = produceMessage;
