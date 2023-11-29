import express from "express"
import { graphqlHTTP } from "express-graphql"
import { buildSchema } from "graphql"
import cors from "cors";
import {
    createClient
} from "../common/infrastructure/db.js"
import { PartRepository } from "./infrastructure/PartRepository.js";
import { MeasurementRepository } from "./infrastructure/MeasurementRepository.js";

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

const schema = buildSchema(`
    type Part {
        id: String
        name: String
        features: [Feature]
    }

    type Feature {
        id: String
        name: String
        controls: [Control]
    }

    type Control {
        id: String
        name: String
    }

    type Query {
        parts: [Part]
    }

    type Subscription {
        measurements(partId: String, featureId: String): [Measurement]
    }

    type Measurement {
        id: String
        controlId: String
        partId: String
        featureId: String
        deviation: Float
        deviationOutOfTolerance: Float
        performance: String
    }
`);

const root = {
    parts: async () => {
        const mongoClient = createClient(MONGO_URI);
        await mongoClient.connect();
        const db = mongoClient.db(MONGO_DB);

        const partRepository = new PartRepository(db);

        const partDocuments = await partRepository.find();

        return partDocuments.map(partDocument => ({
            id: partDocument.id,
            name: partDocument.name,
            features: partDocument.features.map(featureDocument => ({
                id: featureDocument.id,
                name: featureDocument.name,
                controls: featureDocument.controls.map(controlDocument => ({
                    id: controlDocument.id,
                    name: controlDocument.name
                }))
            }))
        }));
    },
    measurements: async ({ partId, featureId }) => {
        const mongoClient = createClient(MONGO_URI);
        await mongoClient.connect();
        const db = mongoClient.db(MONGO_DB);

        const measurementRepository = new MeasurementRepository(db);

        const measurementDocuments = await measurementRepository.find(partId, featureId);

        return measurementDocuments.map(measurementDocument => ({
            id: measurementDocument._id,
            partId: measurementDocument.partId,
            controlId: measurementDocument.controlId,
            featureId: measurementDocument.featureId,
            deviation: measurementDocument.deviation,
            deviationOutOfTolerance: measurementDocument.deviationOutOfTolerance,
            performance: measurementDocument.performance
        }));
    }
}

const app = express()
app.use(cors())

app.use(
    "/graphql",
    graphqlHTTP({
        schema: schema,
        rootValue: root,
        graphiql: true,
    })
)

app.listen(4000)
console.log("Running a GraphQL API server at http://localhost:4000/graphql")