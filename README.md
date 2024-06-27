# RabbitMQ Pub/Sub Examples

This repository contains examples of how to implement Pub/Sub mechanisms using RabbitMQ with queues and different types of exchanges.

## Table of Contents

- [Introduction](#introduction)
- [Queue-Based Pub/Sub](#queue-based-pubsub)
- [Direct Exchange Pub/Sub](#direct-exchange-pubsub)
- [Fanout Exchange Pub/Sub](#fanout-exchange-pubsub)
- [Topic Exchange Pub/Sub](#topic-exchange-pubsub)
- [Headers Exchange Pub/Sub](#headers-exchange-pubsub)
- [Common Parameters](#common-parameters)
- [Running the Examples](#running-the-examples)

## Introduction

RabbitMQ is a message broker that implements the Advanced Message Queuing Protocol (AMQP). This repository demonstrates different Pub/Sub mechanisms using RabbitMQ.

## Queue-Based Pub/Sub

### Overview
In the queue-based Pub/Sub model, messages are sent to and received from a specific queue. This model is straightforward and is suitable for scenarios where you want to ensure that each message is processed by exactly one consumer.

### Publisher
The publisher sends messages directly to a queue. Each message is delivered to one of the consumers that are listening on that queue.

### Subscriber
The subscriber receives messages from a specific queue. Multiple subscribers can listen to the same queue, but each message will be processed by only one subscriber.

## Direct Exchange Pub/Sub

### Overview
In the direct exchange model, messages are routed to queues based on a routing key. The routing key is a message attribute added to the message header and the exchange routes the message to the queues whose binding key exactly matches the routing key of the message.

### Differences
- **Routing Key:** The message includes a routing key.
- **Exact Match:** The exchange routes the message to queues that have a binding key exactly matching the routing key.
- **Use Case:** Ideal for scenarios where messages should be routed based on specific criteria, such as logging levels (info, warning, error).

### Publisher
The publisher sends messages to a direct exchange with a specific routing key. The exchange will route the message to the queue that is bound with a matching routing key.

### Subscriber
The subscriber binds to a queue with a specific binding key and receives messages that are routed to that queue by the exchange.

## Fanout Exchange Pub/Sub

### Overview
In the fanout exchange model, messages are broadcast to all queues that are bound to the exchange. This model ignores the routing key, making it suitable for scenarios where you want to broadcast the same message to multiple consumers.

### Differences
- **No Routing Key:** The exchange ignores the routing key.
- **Broadcast:** The exchange routes the message to all queues bound to it.
- **Use Case:** Suitable for scenarios where all subscribers should receive the same message, such as real-time updates or notifications.

### Publisher
The publisher sends messages to a fanout exchange. The exchange then broadcasts the message to all the queues it knows.

### Subscriber
The subscriber binds to a queue that is bound to the fanout exchange and receives all messages that are broadcasted by the exchange.

## Topic Exchange Pub/Sub

### Overview
In the topic exchange model, messages are routed to queues based on wildcard matches between the routing key and the routing pattern specified in the queue binding. This model allows for more flexible routing compared to direct exchanges.

### Differences
- **Routing Key with Wildcards:** The routing key can contain wildcard characters (`*` and `#`).
  - `*` matches exactly one word.
  - `#` matches zero or more words.
- **Pattern Match:** The exchange routes the message to queues whose binding pattern matches the routing key.
- **Use Case:** Useful for scenarios where messages need to be routed based on patterns, such as categorizing logs by service and severity (e.g., `service1.error`, `service2.info`).

### Publisher
The publisher sends messages to a topic exchange with a routing key that can contain wildcard characters.

### Subscriber
The subscriber binds to a queue with a binding pattern and receives messages that match the pattern. The binding pattern can include wildcard characters (`*` and `#`).

## Headers Exchange Pub/Sub

### Overview
In the headers exchange model, messages are routed based on message header attributes instead of the routing key. This model allows for routing based on multiple attributes and is more flexible in terms of routing criteria.

### Differences
- **Headers instead of Routing Key:** The exchange uses message headers to route messages.
- **Match Headers:** The exchange routes messages to queues that match the specified header attributes.
- **Use Case:** Ideal for scenarios where routing decisions are based on multiple criteria or complex conditions, such as routing messages based on content type and priority.

### Publisher
The publisher sends messages to a headers exchange with specific header attributes. The exchange routes messages based on these headers.

### Subscriber
The subscriber binds to a queue with specific header attributes and receives messages that match these attributes.

## Common Parameters

### RABBITMQ_URL
The URL for connecting to the RabbitMQ server. Typically, this will be `amqp://localhost` if running RabbitMQ locally.

### EXCHANGE_NAME
The name of the exchange to which the publisher will send messages. This varies based on the type of exchange (e.g., `logs`, `direct_logs`, `topic_logs`, `headers_logs`).

### EXCHANGE_TYPE
The type of exchange being used (`direct`, `fanout`, `topic`, `headers`).

### ROUTING_KEY
The routing key used to route messages to the appropriate queue in direct and topic exchanges.

### QUEUE_NAME
The name of the queue to which messages are sent (in queue-based Pub/Sub) or from which messages are received.

### MESSAGE
The content of the message being published.

### HEADERS
The header attributes used in headers exchange to route messages.

## Running the Examples

1. **Install Dependencies:**
   Make sure to run `npm install` to install all necessary dependencies.

2. **Publisher:**
   Navigate to the respective publisher directory (e.g., `src/queues/`) and run the publisher script with the message you want to send.
   ```bash
   node pub.js "Your message here"
   ```