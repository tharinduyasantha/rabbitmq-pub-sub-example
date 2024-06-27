const amqp = require('amqplib');

const RABBITMQ_URL = 'amqp://localhost';
const EXCHANGE_NAME = 'topic_logs';
const EXCHANGE_TYPE = 'topic';
const ROUTING_KEY = 'user.*';

subscriber();

async function subscriber() {
    try {
        const connection = await amqp.connect(RABBITMQ_URL);
        const channel = await connection.createChannel();
        await channel.assertExchange(EXCHANGE_NAME, EXCHANGE_TYPE, { durable: true });
        const q = await channel.assertQueue('', { exclusive: true });
        console.log(`Waiting for messages in queue: ${q.queue}`);
        channel.bindQueue(q.queue, EXCHANGE_NAME, ROUTING_KEY);

        channel.consume(q.queue, msg => {
            if (msg.content) {
                console.log(`Received: ${msg.content.toString()}`);
            }
        }, {
            noAck: true
        });
    } catch (error) {
        console.error('Error in subscribing to messages:', error);
    }
}
