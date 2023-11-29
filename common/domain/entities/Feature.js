export class Feature {
    /**
     * @param {string} id
     * @param {string} name
     * @param {import('./Control').Control[]} controls
     */
    constructor(id, name, controls) {
        this.id = id;
        this.name = name;
        this.controls = controls;
    }

    toDoc() {
        return {
            id: this.id,
            name: this.name,
            controls: this.controls.map(x => x.toDoc())
        };
    }
}