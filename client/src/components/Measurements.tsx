'use client'

import React, { useMemo } from 'react'
import { ControlModel } from '@/model/part';
import { gql, useSubscription } from '@apollo/client';
import { MeasurementModel } from '@/model/measurement';

const query = gql`
    subscription Measurements($partId: String, $featureId: String) {
        measurements(
        partId: $partId,
        featureId: $featureId) {
            id
            partId
            featureId
            controlId
            deviation
            deviationOutOfTolerance
            performance
        }
    }
`;

const Measurements = ({
    partId,
    featureId,
    controls
}: {
    partId: string,
    featureId: string,
    controls: ControlModel[]
}) => {
    const controlDictionary = useMemo(() => {
        return controls.reduce((dictionary, control) => {
            dictionary[control.id] = control;
            return dictionary;
        }, {} as { [key: string]: ControlModel });
    }, [controls]);

    const { loading, data, error } = useSubscription<{ measurements: MeasurementModel[] }>(
        query, {
            variables: {
                partId,
                featureId
            }
        });

    if (loading) {
        return <span>Loading...</span>;
    }
    if (error || !data) {
        console.error(error);
        return <span>Error!</span>;
    }

    return (
        <table className="table-auto w-full">
            <thead>
                <tr>
                    <th className="px-4 py-2">Control</th>
                    <th className="px-4 py-2">Dev</th>
                    <th className="px-4 py-2">Dev Out Tol</th>
                    <th className="px-4 py-2">Performance</th>
                </tr>
            </thead>
            <tbody>
                {data.measurements.map((measurement) => {
                    const control = controlDictionary[measurement.controlId];
                    return (
                        <tr key={measurement.id}>
                            <td className="border px-4 py-2 text-center align-middle">{control?.name}</td>
                            <td className="border px-4 py-2 text-center align-middle">{measurement.deviation}</td>
                            <td className="border px-4 py-2 text-center align-middle">{measurement.deviationOutOfTolerance}</td>
                            <td className="border px-4 py-2 text-center align-middle">
                                <span className={`inline-block w-4 h-4 rounded-full ${measurement.performance === 'BAD' ? 'bg-red-500' : measurement.performance === 'ACCEPTABLE' ? 'bg-yellow-500' : 'bg-green-500'}`}></span>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

export default Measurements