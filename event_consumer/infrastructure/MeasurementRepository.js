import { Repository } from "../../common/infrastructure/Repository.js";

export class MeasurementRepository extends Repository {
    /**
     * @param {import('mongodb').Db} db
     */
    constructor(db) {
        super(db, "measurements");
    }

    /**
     * @param {import('../../common/domain/entities/Measurement').Measurement} measurement
     */
    insert(measurement) {
        return super.insert(measurement.toDoc());
    }
}