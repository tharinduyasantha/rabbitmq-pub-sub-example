const amqp = require('amqplib');

const RABBITMQ_URL = 'amqp://localhost';
const EXCHANGE_NAME = 'logs';
const EXCHANGE_TYPE = 'fanout';

subscriber();

async function subscriber() {
    try {
        // Connect to RabbitMQ server
        const connection = await amqp.connect(RABBITMQ_URL);
        const channel = await connection.createChannel();
        
        // Assert an exchange into existence
        await channel.assertExchange(EXCHANGE_NAME, EXCHANGE_TYPE, { durable: true });
        
        // Assert a temporary queue
        const q = await channel.assertQueue('', { exclusive: true });
        console.log(`Waiting for messages in queue: ${q.queue}`);
        
        // Bind the queue to the exchange
        channel.bindQueue(q.queue, EXCHANGE_NAME, '');

        // Consume messages from the queue
        channel.consume(q.queue, msg => {
            if (msg.content) {
                console.log(`Received: ${msg.content.toString()}`);
            }
        }, {
            noAck: true // Acknowledge messages automatically
        });
    } catch (error) {
        console.error('Error in subscribing to messages:', error);
    }
}
