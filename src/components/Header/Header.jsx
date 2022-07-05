import { replace } from 'formik'
import React from 'react'
import {useNavigate} from 'react-router-dom'
import './Header.styles.css'

const Header = () => {

  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/', {replace: false})
  }
  return (
    <header>
        <span>Go Scrum</span>
        <div
        onClick={handleLogout}
        >
            x
        </div>
    </header>
  )
}

export default Header