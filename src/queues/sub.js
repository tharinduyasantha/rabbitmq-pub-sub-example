const amqp = require('amqplib');

const RABBITMQ_URL = 'amqp://localhost';
const QUEUE_NAME = 'demoqueue';

subscriber();

async function subscriber() {
    try {
        // Connect to RabbitMQ server
        const connection = await amqp.connect(RABBITMQ_URL);
        const channel = await connection.createChannel();
        
        // Assert a queue into existence
        const q = await channel.assertQueue(QUEUE_NAME);
        console.log(`Waiting for messages in queue: ${q.queue}`);

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
