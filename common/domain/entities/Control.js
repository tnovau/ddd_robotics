export class Control {
    /**
     * @param {string} id
     * @param {string} name
     * @param {number} idealMeasurement
     * @param {import('./Measurements').Measurement[]} measurements
     */
    constructor(id, name, idealMeasurement, measurements) {
        this.id = id;
        this.name = name;
        this.idealMeasurement = idealMeasurement;
        this.measurements = measurements;
    }
}