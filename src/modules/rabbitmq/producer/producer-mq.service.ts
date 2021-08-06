import {Injectable, OnModuleInit} from "@nestjs/common";
import * as amqp from "amqplib";

@Injectable()
export class RabbitmqService {
    private rmqConsumingQueue = 'notificationQueue'
    private rmqChannel: amqp.Channel;
    constructor(
    ) {}

    async consumeQueue(): Promise<void> {
        // const rmqConnection = await amqp.connect('amqp://mqadmin:mqadmin123@112.137.132.104:5672')
        const rmqConnection = await amqp.connect({
            hostname: '112.137.132.104',
            port: '5672',
            vhost: 'NOTIFICATION',
            username: 'notification',
            password: 'notification!@#',
        })
        this.rmqChannel = await rmqConnection.createChannel();
        await this.rmqChannel.consume(this.rmqConsumingQueue, this.consumingCallback, { noAck: true })
    }

    private async consumingCallback(message: amqp.ConsumeMessage) {
        const payload = JSON.parse(message.content.toString())
        console.log('---------------', payload)
    }

    async sendToQueue(): Promise<void> {
        const rmqConnection = await amqp.connect({
            hostname: '112.137.132.104',
            port: '5672',
            vhost: 'ASSIGN_TASK',
            username: 'assign_task',
            password: 'assign_A#$1',
        })
        this.rmqChannel = await rmqConnection.createChannel();
        const message = JSON.stringify({"UserId": "362238c3-8992-4293-9b83-46b1e4fef410",
        "Type": "approve1123_video"})
        await this.rmqChannel.sendToQueue('assignTaskQueue', Buffer.from(message))
    }
    

}