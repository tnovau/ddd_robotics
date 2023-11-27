export class Feature {
    constructor() {
        this.id = "";
        this.name = "";
        /** @type {import('./Control').Control[]} */
        this.controls = [];
    }
}