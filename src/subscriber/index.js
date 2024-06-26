
const amqp = require('amqplib');

const RABBITMQ_URL = 'amqp://localhost';
const EXCHANGE_NAME = 'logs';
const EXCHANGE_TYPE = 'fanout';
const ROUTING_KEY = 'mainroute';
const QUEUE_NAME = 'demoqueue'

subscriber();

async function subscriber() {
    try {
        const connection = await amqp.connect(RABBITMQ_URL);
        const channel = await connection.createChannel();
        
        
        //Reciving through exchange
        //await channel.assertExchange(EXCHANGE_NAME, EXCHANGE_TYPE, { durable: true }); //Reciving through exchange
        const q = await channel.assertQueue(QUEUE_NAME); //Reciving through Queues
        console.log(`Waiting for messages in queue: ${q.queue}`);
        //channel.bindQueue(q.queue, EXCHANGE_NAME, ''); //Reciving through Queues

        channel.consume(q.queue, msg => {
            if (msg.content) {
                console.log(`Received: ${msg.content.toString()}`);
            }
        },{
            ack:false
        });
    } catch (error) {
        console.error('Error in subscribing to messages:', error);
    }
}
