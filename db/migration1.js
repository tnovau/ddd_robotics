import { createClient } from '../common/infrastructure/db.js';
import { Part } from '../common/domain/entities/Part.js';
import { Feature } from '../common/domain/entities/Feature.js';
import { Control } from '../common/domain/entities/Control.js';

if (process.env.MONGO_URI === undefined) {
    throw new Error("MONGO_URI environment variable is not defined");
}

if (process.env.MONGO_DB === undefined) {
    throw new Error("MONGO_DB environment variable is not defined");
}

const {
    MONGO_URI,
    MONGO_DB
} = process.env;


const client = createClient(MONGO_URI);

(async () => {
    await client.connect();
    const collection = client.db("test").collection("parts");

    const controlX = new Control(
        'd8a5bd0f-f815-4c3e-b392-eedd6892f10d',
        'Control X',
        2.5,
        0.1
    );
    const featureA = new Feature(
        '9c491cd1-377b-41b0-a81f-59c0b01ef1dd',
        'Feature A',
        [controlX]
    );
    const partA = new Part(
        '1764bdf3-4214-417a-89f2-3196aba3c7aa',
        'Part A',
        [featureA]
    );

    const part = partA.toDoc();

    const newPart = await collection.insertOne(part);

    console.log(newPart);
    await client.close();
    process.exit(0);
})();