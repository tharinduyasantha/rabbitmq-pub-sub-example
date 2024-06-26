
const amqp = require('amqplib');

// Load environment variables

const RABBITMQ_URL = 'amqp://localhost';
const EXCHANGE_NAME = 'logs';
const EXCHANGE_TYPE = 'fanout';
const ROUTING_KEY = 'mainroute';
const QUEUE_NAME = 'demoqueue'
const MESSAGE = {message: process.argv[2]};

publishMessage();
async function publishMessage() {
    try {
        const connection = await amqp.connect(RABBITMQ_URL);
        const channel = await connection.createChannel();
        //await channel.assertExchange(EXCHANGE_NAME, EXCHANGE_TYPE, { durable: true }); //Sending through exchange
        const result = await channel.assertQueue(QUEUE_NAME);//Sending through queue
        channel.sendToQueue(QUEUE_NAME,Buffer.from(JSON.stringify(MESSAGE)));
        //channel.publish(EXCHANGE_NAME, ROUTING_KEY, Buffer.from(message));
        console.log(`Message sent: ${JSON.stringify(MESSAGE)}`);
        await channel.close();
        await connection.close();
    } catch (error) {
        console.error('Error in publishing message:', error);
    }
}
