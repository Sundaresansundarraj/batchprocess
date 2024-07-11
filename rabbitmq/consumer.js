const amqp = require('amqplib/callback_api');
require('dotenv').config();
const RABBITMQ = process.env.RABBITMQ

const consumeMessages = (queue, processMessage) => {
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

      console.log(`[x] Waiting for messages in ${queue}`);
      channel.consume(queue, async (msg) => {
        const data = JSON.parse(msg.content.toString());
        await processMessage(data);
      }, {
        noAck: true
      });
    });
  });
};

module.exports = consumeMessages;
