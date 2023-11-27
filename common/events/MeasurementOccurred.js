export class MeasurementOccurred {
    /**
     * @param {string} partId
     * @param {string} featureId
     * @param {string} controlId
     * @param {number} measurement
     */
    constructor(
        partId,
        featureId,
        controlId,
        measurement
    ) {
        this.partId = partId;
        this.featureId = featureId;
        this.controlId = controlId;
        this.measurement = measurement;
    }

    /**
     * @param {string} json
     */
    static fromJSON(json) {
        const object = JSON.parse(json);
        const measurementOccurred = new MeasurementOccurred('', '', '', 0);

        for (const property in object) {
            measurementOccurred[property] = object[property];
        }

        return measurementOccurred;
    }
}
