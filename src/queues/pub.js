const amqp = require('amqplib');

const RABBITMQ_URL = 'amqp://localhost';
const QUEUE_NAME = 'demoqueue';
const MESSAGE = { message: process.argv[2] }; // Message from command line argument

publishMessage();

async function publishMessage() {
    try {
        // Connect to RabbitMQ server
        const connection = await amqp.connect(RABBITMQ_URL);
        const channel = await connection.createChannel();
        
        // Assert a queue into existence
        const result = await channel.assertQueue(QUEUE_NAME);
        
        // Send a message to the queue
        channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(MESSAGE)));
        console.log(`Message sent: ${JSON.stringify(MESSAGE)}`);
        
        // Close the channel and connection
        await channel.close();
        await connection.close();
    } catch (error) {
        console.error('Error in publishing message:', error);
    }
}
