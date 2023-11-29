import { connect } from 'amqplib';
import { MeasurementOccurred } from '../common/events/MeasurementOccurred.js';
import { PartRepository } from './infrastructure/PartRepository.js';
import { MeasurementRepository } from './infrastructure/MeasurementRepository.js';
import { createClient } from '../common/infrastructure/db.js';
import { Measurement } from '../common/domain/entities/Measurement.js';
import { Control } from '../common/domain/entities/Control.js';

if (!process.env.RABBIT_HOST) {
    console.error('RABBIT_HOST is not defined');
    process.exit(1);
}

if (!process.env.RABBIT_QUEUE) {
    console.error('RABBIT_QUEUE is not defined');
    process.exit(1);
}

if (process.env.MONGO_URI === undefined) {
    throw new Error("MONGO_URI environment variable is not defined");
}

if (process.env.MONGO_DB === undefined) {
    throw new Error("MONGO_DB environment variable is not defined");
}

const {
    RABBIT_HOST,
    RABBIT_QUEUE,
    MONGO_URI,
    MONGO_DB
} = process.env;

(async () => {
    const conn = await connect(RABBIT_HOST);

    const channel = await conn.createChannel();
    await channel.assertQueue(RABBIT_QUEUE, { durable: false });

    channel.consume(RABBIT_QUEUE, async function (msg) {
        const mongoClient = createClient(MONGO_URI);

        try {
            await mongoClient.connect();
            const db = mongoClient.db(MONGO_DB);

            const partRepository = new PartRepository(db);
            const measurementRepository = new MeasurementRepository(db);

            const measurementOccurred = MeasurementOccurred.fromJSON(msg.content.toString());

            const partDocument = await partRepository.findById(measurementOccurred.partId);

            if (partDocument === null) {
                throw new Error(`Part with id ${measurementOccurred.partId} not found`);
            }

            const featureDocument = partDocument.features.find(x => x.id === measurementOccurred.featureId);

            const controlDocument = featureDocument.controls.find(x => x.id === measurementOccurred.controlId);

            const control = new Control(
                controlDocument.id,
                controlDocument.name,
                controlDocument.idealMeasurement,
                controlDocument.tolerance
            );

            const measurement = new Measurement(
                measurementOccurred.partId,
                measurementOccurred.featureId,
                control,
                measurementOccurred.measurement
            );

            const result = await measurementRepository.insert(measurement);

            console.log(`Measurement with id ${result.insertedId} inserted`);
        } catch (error) {
            console.error(error);
        } finally {
            await mongoClient.close();
        }
    }, {
        noAck: true
    });
})();
