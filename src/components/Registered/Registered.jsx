import React from 'react'
import { useParams } from 'react-router-dom'

const Registered = () => {

    const { teamID } = useParams() 
  return (
    <div>El team id del equipo es: {teamID}</div>
  )
}

export default Registered