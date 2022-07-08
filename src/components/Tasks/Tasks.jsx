import './Tasks.styles.css'
import React, {useState, useEffect} from 'react'
import Skeleton from 'react-loading-skeleton'
import debounce from 'lodash.debounce'
import 'react-loading-skeleton/dist/skeleton.css'
import Header from '../Header/Header'
import { useResize } from '../../hooks/useResize'
import Card from '../Card/Card'
import TaskForm from '../TaskForm/TaskForm'
import { useSelector, useDispatch } from 'react-redux'
import { FormControlLabel, Radio, RadioGroup, FormControl  } from '@mui/material'
import { getTasks, deleteTask } from '../../store/actions/tasksAction'



const Tasks = () => {

    const { isPhone } = useResize()
    const [list, setList] = useState(null)
    const [taskFromWho, setTaskFromWho] = useState("ALL")
    const [renderList, setRenderList] = useState(null)
    const [search, setSearch] = useState("")

    const dispatch = useDispatch()
    
useEffect(() => {
    dispatch(getTasks(taskFromWho === "ME" ? "/me" : ''))
},[taskFromWho])

const { loading, error, tasks} = useSelector(state => {
    return state.tasksReducer
})

useEffect(() => {
    if(tasks?.length) {
        setList(tasks)
        setRenderList(tasks)

    }
}, [tasks])

useEffect(() => {
    if(search) {
        setRenderList(
            list.filter(data => data.title.startsWith(search))
        )
    } else setRenderList(list)
},[search])

if(error) return <div>Hay un error</div>

    const handleDeleteCard = (id) => dispatch(deleteTask(id))

    const renderAllCards = () => {
        return renderList?.map(data => <Card deleteCard={handleDeleteCard} key={data._id} data={data}/>)
    }
    const renderColumnTasks = text => { 
        return renderList
        ?.filter(data => data.status === text)
        .map(data => <Card deleteCard={handleDeleteCard} key={data._id} data={data}/>)

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