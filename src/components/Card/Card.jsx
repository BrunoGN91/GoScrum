import React from 'react'

const Card = ({data}) => {

 
  return (
    <div className='card'>
                        <div className='close'>x</div>
                        <h3>{data.title}</h3>
                        <h6>{data.createdAt}</h6>
                        <h4>{data.user.userName}</h4>
                        <button type="button">{data.status}</button>
                        <button type="button">{data.importance}</button>
                        <p>{data.description}</p>
                    </div>
  )
}

export default Card