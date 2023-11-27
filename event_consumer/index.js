import { connect } from 'amqplib/callback_api.js';
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

connect(RABBIT_HOST, function (error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function (error1, channel) {
        if (error1) {
            throw error1;
        }

        channel.assertQueue(RABBIT_QUEUE, {
            durable: false
        });

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", RABBIT_QUEUE);
        channel.consume(RABBIT_QUEUE, function (msg) {
            const measurementOccurred = MeasurementOccurred.fromJSON(msg.content.toString());

            console.log(" [x] Received %s", measurementOccurred);
        }, {
            noAck: true
        });
    });
});
