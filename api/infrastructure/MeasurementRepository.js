import { Repository } from "../../common/infrastructure/Repository.js";

export class MeasurementRepository extends Repository {
    /**
     * @param {import('mongodb').Db} db
     */
    constructor(db) {
        super(db, "measurements");
    }

    find(partId, featureId, controlId) {
        return super.find({ partId, featureId, controlId });
    }
}