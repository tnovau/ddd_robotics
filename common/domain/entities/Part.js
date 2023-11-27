export class Part {
    constructor() {
        this.id = "";
        this.name = "";
        /** @type {import('./Feature').Feature[]} */
        this.features = [];
    }
}