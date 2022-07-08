import React, {useState} from 'react'
import './Card.styles.css'

const Card = ({
  deleteCard,
  data
}) => {

  const [showMore, setShowMore] = useState(false)
  
  const limitString = (str) => {
    if(str.length > 50) {
        return { string: str.slice(0,50).concat("..."), addButton: true}
    }
    return { string: str, addButton: false}
}  

 const dateTime = new Date(data.createdAt).toLocaleString() + " hs."
  return (
    <div className='card'>
                        <div className='close' onClick={() => deleteCard(data._id)}>x</div>
                        <h3>{data.title}</h3>
                        <h6>{dateTime}</h6>
                        <h4>{data.user.userName}</h4>
                        <button className={data.status.toLowerCase()} type="button">{data.status.toLowerCase()}</button>
                        <button className={data.importance.toLowerCase()} type="button">{data.importance.toLowerCase()}</button>
                       {!showMore && <p>{limitString(data.description).string}</p>}
                            {showMore && (
                            <>
                                  <p>{data.description}</p>
                                  <button 
                                    type="button" 
                                    onClick={() => setShowMore(!showMore)}>
                                      Ver menos
                                  </button>
                            </>
                            )}
                            {!showMore && limitString(data.description).addButton && 
                             (<button 
                              type="button" 
                              onClick={() => setShowMore(!showMore)}>
                                Ver más
                            </button>)}
                            
                        
                    </div>
  )
}

export default Card