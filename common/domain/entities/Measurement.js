export class Measurement {
    /**
     * @param {string} partId
     * @param {string} featureId
     * @param {import('./Control').Control} control
     * @param {number} measurement
     */
    constructor(
        partId,
        featureId,
        control,
        measurement
    ) {
        this.partId = partId;
        this.featureId = featureId;
        this.control = control;
        this.measurement = measurement;
    }

    get deviation() {
        return this.control.deviation(this.measurement);
    }

    get deviationOutOfTolerance() {
        return this.control.deviationOutOfTolerance(this.measurement);
    }

    toDoc() {
        return {
            partId: this.partId,
            featureId: this.featureId,
            controlId: this.control.id,
            measurement: this.measurement,
            deviation: this.deviation,
            deviationOutOfTolerance: this.deviationOutOfTolerance
        };
    }
}