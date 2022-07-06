import './Tasks.styles.css'
import React, {useState, useEffect} from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Header from '../Header/Header'
import { useResize } from '../../hooks/useResize'
import Card from '../Card/Card'
import TaskForm from '../TaskForm/TaskForm'



const Tasks = () => {

    const { isPhone } = useResize()
    const [list, setList] = useState(null)
    const [loading, setLoading] = useState(false)

useEffect(() => {
    setLoading(true)
        fetch(`${process.env.REACT_APP_API_ENDPOINT}/task`, {
         method: "GET",
         headers: {
          'Content-Type' : 'application/json',
          Authorization: `Bearer ${localStorage.getItem("token")}`,
         }
       }).then(res => res.json()
       ).then(data => {
        setTimeout(() => {
            setList(data.result)
            setLoading(false)
        }, 1000)
       })
     
},[])

    const limitString = (str) => {
        if(str.length > 150) {
            return { string: str.slice(0,150).concat("..."), addButton: true}
        }
        return { string: str, addButton: false}
    }  

    const renderAllCards = () => {
        return list?.map(data => <Card key={data._id} data={data}/>)
    }
    const renderNewCards = () => { 
        return list
        ?.filter(data => data.status === "NEW")
        .map(data => <Card key={data._id} data={data}/>)

    }
    const renderInProgressCards = () => { 
        return list
        ?.filter(data => data.status === "IN PROGRESS")
        .map(data => <Card key={data._id} data={data}/>)

    }
    const renderFinishedCards = () => { 
        return list
        ?.filter(data => data.status === "FINISHED")
        .map(data => <Card key={data._id} data={data}/>)

    }

  return (
    <>
    <Header />
    <main id="tasks">
        <TaskForm />
        <section className='wrapper_list'>
            <div className='list_header'>
                <h2>Mis tareas</h2>
            </div>
            {isPhone ? ( 
            <> 
              {loading && <Skeleton /> }
                     <div className='list phone'> 
                        {renderAllCards()} 
                    </div>
            </>
            ) : (
            <>
            {!list?.length === 0 ? (<div>No hay tareas</div>) : null}
            {loading ? <Skeleton /> : (

            
            <div className='list_group'>
                <div className='list'>
                    <h2>Nuevas</h2>
                    {renderNewCards()}
                </div>
                <div className='list'>
                    <h2>En progreso</h2>
                    {renderInProgressCards()}
                </div>
                <div className='list'>
                    <h2>Finalizadas</h2>
                    {renderFinishedCards()}
                </div>
            </div>
            
            )}
            </>
            )}
            
        </section>
    </main>
    </>
  )
}

export default Tasks