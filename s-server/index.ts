import app from "./app";
import {dbConnection} from "./config/config";
import { dev } from "./config/db";
import { connectRabbitMQ } from "./config/rabbitmq";
import { connectRedis } from "./config/redis";

const port = dev.app.port

app.listen(port, async(): Promise<void> =>{
    console.log(`http://localhost:${port}`)
    await dbConnection()
    await connectRedis();
    await connectRabbitMQ(); 
})