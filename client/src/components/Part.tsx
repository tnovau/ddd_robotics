import { PartModel } from '@/model/part'
import React from 'react'

const Part = (part: PartModel) => {
  return (
    <div>{part.name}</div>
  )
}

export default Part;