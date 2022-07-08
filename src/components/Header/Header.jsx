
import { useSelector } from 'react-redux'

import React from 'react'
import {useNavigate} from 'react-router-dom'
import './Header.styles.css'

const Header = () => {

  const navigate = useNavigate()

  const { tasks} = useSelector(state => {
    return state.tasksReducer
})
  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userName')

    navigate('/', {replace: false})
  }
  return (
    <header>
        <span>Go Scrum</span>
        <div className="wrapper_right_header">
          <div className='black'>Tareas creadas: {tasks?.length}</div>
          <div>{localStorage.getItem("userName")}</div>
          <div onClick={handleLogout}>x</div>
        </div>
    </header>
  )
}

export default Header