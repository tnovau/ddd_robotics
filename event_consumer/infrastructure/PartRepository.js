import { Repository } from '../../common/infrastructure/Repository.js'

export class PartRepository extends Repository {
    /**
     * @param {import('mongodb').Db} db
     */
    constructor(db) {
        super(db, "parts");
    }

    /**
     * @param {string} id
     */
    findById(id) {
        return super.findById(id);
    }
}