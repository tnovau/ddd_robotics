export class Repository {
    /**
     * @param {import('mongodb').Db} db
     * @param {string} collection
     */
    constructor(db, collection) {
        this.db = db;
        this.collection = collection;
    }

    async insert(doc) {
        return await this.db.collection(this.collection).insertOne(doc);
    }

    /**
     * @param {string} id
     */
    async findById(id) {
        return await this.db.collection(this.collection).findOne({
            _id: id
        });
    }

    /**
     * @param {*} filter
     */
    async find(filter = {})
    {
        return await this.db.collection(this.collection).find(filter).toArray();
    }
}