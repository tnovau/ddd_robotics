const MeasurementQuery = `{
    measurements(
      partId:"1764bdf3-4214-417a-89f2-3196aba3c7aa",
      featureId: "9c491cd1-377b-41b0-a81f-59c0b01ef1dd",
      controlId: "d8a5bd0f-f815-4c3e-b392-eedd6892f10d") {
      id
      partId
      featureId
      controlId
      deviation
      deviationOutOfTolerance
      performance
    }
  }`
  const PartQuery = `{
    parts {
      id
      name
      features {
        id
        name
        controls {
          id
          name
        }
      }
    }
  }`