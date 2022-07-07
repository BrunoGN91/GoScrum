import './Tasks.styles.css'
import React, {useState, useEffect} from 'react'
import Skeleton from 'react-loading-skeleton'
import debounce from 'lodash.debounce'
import 'react-loading-skeleton/dist/skeleton.css'
import Header from '../Header/Header'
import { useResize } from '../../hooks/useResize'
import Card from '../Card/Card'
import TaskForm from '../TaskForm/TaskForm'
import { FormControlLabel, Radio, RadioGroup, FormControl  } from '@mui/material'



const Tasks = () => {

    const { isPhone } = useResize()
    const [list, setList] = useState(null)
    const [taskFromWho, setTaskFromWho] = useState("ALL")
    const [renderList, setRenderList] = useState(null)
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState("")

useEffect(() => {
    setLoading(true)
        fetch(`${process.env.REACT_APP_API_ENDPOINT}/task${taskFromWho === "ME" ? "/me" : ''}`, {
         method: "GET",
         headers: {
          'Content-Type' : 'application/json',
          Authorization: `Bearer ${localStorage.getItem("token")}`,
         }
       }).then(res => res.json()
       ).then(data => {
        setTimeout(() => {
            setList(data.result)
            setRenderList(data.result)
            setLoading(false)
        }, 1000)
       })
     
},[taskFromWho])

useEffect(() => {
    if(search) {
        setRenderList(
            list.filter(data => data.title.startsWith(search))
        )
    } else setRenderList(list)
     
},[search])

    const renderAllCards = () => {
        return renderList?.map(data => <Card key={data._id} data={data}/>)
    }
    const renderColumnTasks = text => { 
        return renderList
        ?.filter(data => data.status === text)
        .map(data => <Card key={data._id} data={data}/>)

    }
  

    const handleChangeImportance = (e) => {
        if(e.currentTarget.value === "ALL") setRenderList(list)
        else
            setRenderList(
                list.filter(data => data.importance === e.currentTarget.value)
            )
    }
    const handleSearch = debounce(e => {
        setSearch(e?.target?.value)
    }, 1000)

  return (
    <>
    <Header />
    <main id="tasks">
        <TaskForm />
        <section className='wrapper_list'>
            <div className='list_header'>
                <h2>Mis tareas</h2>
            </div>
            <div className='filters'>
                <FormControl>
                    <RadioGroup
                    row
                    aria-labelledby='demo-row-radio-buttons-group-label'
                    name="row-radio-buttons-group"
                    onChange={(e) => setTaskFromWho(e.currentTarget.value)}
                    >
                        <FormControlLabel
                        value="ALL"
                        control={<Radio />}
                        label="Todas"
                        />
                        <FormControlLabel
                        value="ME"
                        control={<Radio />}
                        label="Mis Tareas"
                        />
                    </RadioGroup>
                </FormControl>
                <div className="search_task">
                    <input
                    type="text"
                    onChange={(e) => handleSearch(e)}
                    placeholder="Buscar por título.." />
                </div>
                <select name="importance" onChange={(e) => {handleChangeImportance(e)}}>
                        <option value="">Seleccionar una opción</option>
                        <option value="ALL">Todas</option>
                        <option value="LOW">Baja</option>
                        <option value="MEDIUM">Media</option>
                        <option value="HIGH">Alta</option>
                </select>
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
            {!renderList?.length === 0 ? (<div>No hay tareas</div>) : null}
            {loading ? <Skeleton /> : (
            <div className='list_group'>
                <div className='list'>
                    <h2>Nuevas</h2>
                    {renderColumnTasks("NEW")}
                </div>
                <div className='list'>
                    <h2>En progreso</h2>
                    {renderColumnTasks("IN PROGRESS")}
                </div>
                <div className='list'>
                    <h2>Finalizadas</h2>
                    {renderColumnTasks("FINISHED")}
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