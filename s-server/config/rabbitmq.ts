import amqp, { Connection, Channel } from 'amqplib';

const RABBITMQ_URL = process.env.RABBITMQ_URL || "amqp://localhost";

let connection: Connection;
let channel: Channel;

 
export const connectRabbitMQ = async (): Promise<void> => {
  try {
    connection = await amqp.connect(RABBITMQ_URL);
    channel = await connection.createChannel();
    console.log("Connected to RabbitMQ...");
  } catch (error) {
    console.error("RabbitMQ connection error:", error);
    process.exit(1);
  }
};

 
export const publishMessage = async (queue: string, message: any): Promise<void> => {
  try {
    await channel.assertQueue(queue, { durable: true });
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), { persistent: true });
    console.log(`Message sent to queue ${queue}:`, message);
  } catch (error) {
    console.error("Error publishing message:", error);
  }
};

 
export const consumeMessage = async (queue: string, callback: (msg: any) => void): Promise<void> => {
  try {
    await channel.assertQueue(queue, { durable: true });
    channel.consume(queue, (msg: any) => {
      if (msg !== null) {
        const messageContent = JSON.parse(msg.content.toString());
        callback(messageContent);
        channel.ack(msg);
      }
    });
    console.log(`Consuming messages from queue ${queue}...`);
  } catch (error) {
    console.error("Error consuming message:", error);
  }
};


 