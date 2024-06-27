const amqp = require('amqplib');

const RABBITMQ_URL = 'amqp://localhost';
const EXCHANGE_NAME = 'logs';
const EXCHANGE_TYPE = 'fanout';
const MESSAGE = { message: process.argv[2] }; // Message from command line argument

publishMessage();

async function publishMessage() {
    try {
        // Connect to RabbitMQ server
        const connection = await amqp.connect(RABBITMQ_URL);
        const channel = await connection.createChannel();
        
        // Assert an exchange into existence
        await channel.assertExchange(EXCHANGE_NAME, EXCHANGE_TYPE, { durable: true });
        
        // Publish a message to the exchange
        channel.publish(EXCHANGE_NAME, '', Buffer.from(JSON.stringify(MESSAGE)));
        console.log(`Message sent: ${JSON.stringify(MESSAGE)}`);
        
        // Close the channel and connection
        await channel.close();
        await connection.close();
    } catch (error) {
        console.error('Error in publishing message:', error);
    }
}
