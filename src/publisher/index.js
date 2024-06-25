
const amqp = require('amqplib');

// Load environment variables

const RABBITMQ_URL = 'amqp://localhost';
const EXCHANGE_NAME = 'logs';
const EXCHANGE_TYPE = 'fanout';

async function publishMessage(message) {
    try {
        const connection = await amqp.connect(RABBITMQ_URL);
        const channel = await connection.createChannel();
        await channel.assertExchange(EXCHANGE_NAME, EXCHANGE_TYPE, { durable: true });
        channel.publish(EXCHANGE_NAME, '', Buffer.from(message));
        console.log(`Message sent: ${message}`);
        await channel.close();
        await connection.close();
    } catch (error) {
        console.error('Error in publishing message:', error);
    }
}

publishMessage('Hello, World!');
