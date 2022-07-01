import React from 'react'

const Card = ({data}) => {
  return (
    <div className='card'>
                        <div className='close'>x</div>
                        <h3>{data.title}</h3>
                        <h6>{data.datetime}</h6>
                        <h4>{data.creator}</h4>
                        <button type="button">{data.type}</button>
                        <button type="button">{data.priority}</button>
                        <p>{data.description}</p>
                    </div>
  )
}

export default Card