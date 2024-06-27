const amqp = require('amqplib');

const RABBITMQ_URL = 'amqp://localhost';
const EXCHANGE_NAME = 'direct_logs';
const EXCHANGE_TYPE = 'direct';
const ROUTING_KEY = 'info';
const MESSAGE = { message: process.argv[2] };

publishMessage();

async function publishMessage() {
    try {
        const connection = await amqp.connect(RABBITMQ_URL);
        const channel = await connection.createChannel();
        await channel.assertExchange(EXCHANGE_NAME, EXCHANGE_TYPE, { durable: true });
        channel.publish(EXCHANGE_NAME, ROUTING_KEY, Buffer.from(JSON.stringify(MESSAGE)));
        console.log(`Message sent: ${JSON.stringify(MESSAGE)}`);
        await channel.close();
        await connection.close();
    } catch (error) {
        console.error('Error in publishing message:', error);
    }
}
