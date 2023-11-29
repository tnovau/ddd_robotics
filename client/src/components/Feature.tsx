import { FeatureModel } from '@/model/part'
import React from 'react'
import Measurements from './Measurements'

const Feature = ({ feature, partId }: { partId: string, feature: FeatureModel }) => {
  return (
    <>
      <div>{feature.name}</div>
      <Measurements controls={feature.controls} featureId={feature.id} partId={partId} />
    </>
  )
}

export default Feature