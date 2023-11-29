export class Control {
    /**
     * @param {string} id
     * @param {string} name
     * @param {number} idealMeasurement
     * @param {number} tolerance
     */
    constructor(id, name, idealMeasurement, tolerance) {
        this.id = id;
        this.name = name;
        this.idealMeasurement = idealMeasurement;
        this.tolerance = tolerance;
    }

    /**
     * @param {number} measurement
     */
    deviation(measurement) {
        return Number((measurement - this.idealMeasurement).toPrecision(3));
    }

    /**
     * @param {number} measurement
     */
    isOutOfTolerance(measurement) {
        return Math.abs(this.deviation(measurement)) > this.tolerance;
    }

    /**
     * @param {number} measurement
     */
    deviationOutOfTolerance(measurement) {
        return this.isOutOfTolerance(measurement) ? this.deviation(measurement) : 0;
    }

    toDoc() {
        return {
            id: this.id,
            name: this.name,
            idealMeasurement: this.idealMeasurement,
            tolerance: this.tolerance
        };
    }
}