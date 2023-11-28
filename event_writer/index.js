import { connect } from 'amqplib';
import { MeasurementOccurred } from '../common/events/MeasurementOccurred.js';

if (!process.env.RABBIT_HOST) {
    console.error('RABBIT_HOST is not defined');
    process.exit(1);
}

if (!process.env.RABBIT_QUEUE) {
    console.error('RABBIT_QUEUE is not defined');
    process.exit(1);
}

const {
    RABBIT_HOST,
    RABBIT_QUEUE
} = process.env;

(async () => {
    const conn = await connect(RABBIT_HOST);

    const channel = await conn.createChannel();
    await channel.assertQueue(RABBIT_QUEUE, { durable: false });

    const measurementOccurred = new MeasurementOccurred(
        '1764bdf3-4214-417a-89f2-3196aba3c7aa',
        '9c491cd1-377b-41b0-a81f-59c0b01ef1dd',
        'd8a5bd0f-f815-4c3e-b392-eedd6892f10d',
        2.5
    );
    const message = JSON.stringify(measurementOccurred);

    channel.assertQueue(RABBIT_QUEUE, {
        durable: false
    });

    channel.sendToQueue(RABBIT_QUEUE, Buffer.from(message));
    console.log(" [x] Sent %s", message);

    setTimeout(function () {
        conn.close();
        process.exit(0)
    }, 500);
})();
