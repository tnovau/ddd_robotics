export class Part {
    /**
     * @param {string} id
     * @param {string} name
     * @param {import('./Feature').Feature[]} features
     */
    constructor(id, name, features) {
        this.id = id;
        this.name = name;
        this.features = features;
    }

    toDoc() {
        return {
            _id: this.id,
            id: this.id,
            name: this.name,
            features: this.features.map(x => x.toDoc())
        };
    }
}