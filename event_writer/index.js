import { connect } from 'amqplib/callback_api.js';

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
        const msg = 'Hello world';

        channel.assertQueue(RABBIT_QUEUE, {
            durable: false
        });

        channel.sendToQueue(RABBIT_QUEUE, Buffer.from(msg));
        console.log(" [x] Sent %s", msg);

        setTimeout(function () {
            connection.close();
            process.exit(0)
        }, 500);
    });
});
