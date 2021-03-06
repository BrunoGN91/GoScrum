import { lazy, Suspense } from 'react'
import { Route, Routes, Navigate, useLocation, useNavigate} from 'react-router-dom'
import { AnimatePresence, motion} from 'framer-motion'
import './App.css';
import Login from './components/Auth/Login';
import {Register }from './components/Auth/Register'
import Registered from './components/Registered/Registered';
import {Donate} from './components/Donate/Donate';

import Tasks from './components/Tasks/Tasks';

const Error404 = lazy (() => import('./components/Errores/Error404'))

const RequireAuth = ({children}) => {
  if(!localStorage.getItem("token")) {
    return <Navigate to="/login" replace={true} />
  } 
    return children
}

const pageTransistion = {
  in: {
    opacity: 1
  },
  out: {
    opacity: 0
  },
}

const App = () => {

  const navigate = useNavigate()
  const location = useLocation()

  return (
    <>
    <AnimatePresence>
    <Routes location={location} key={location.pathname}>
      <Route 
      path='/' 
      element={
        <RequireAuth>
            <motion.div 
      className='page' 
      initial="out" 
      animate="in" 
      exit="out" 
      variants={pageTransistion}>
          <Tasks/>
          </motion.div>
        </RequireAuth>}>
      </Route>
      <Route 
      path='/login' 
      element={
      <motion.div 
      className='page' 
      initial="out" 
      animate="in" 
      exit="out" 
      variants={pageTransistion}>
        <Login/>
      </motion.div>}>

      </Route>
      <Route path='/register' element={
       <motion.div 
       className='page' 
       initial="out" 
       animate="in" 
       exit="out" 
       variants={pageTransistion}>
        <Register/>
        </motion.div>}></Route>
      <Route path='*' element={
      <motion.div 
      className='page' 
      initial="out" 
      animate="in" 
      exit="out" 
      variants={pageTransistion}>
        <Suspense fallback={<>...</>}>
          <Error404/>
        </Suspense>
        
      </motion.div>}></Route>
      <Route path='/registered/:teamID' element={
       <motion.div 
       className='page' 
       initial="out" 
       animate="in" 
       exit="out" 
       variants={pageTransistion}>
        <Registered/>
        </motion.div>}></Route>
        <Route path='/donate' element={
       <motion.div 
       className='page' 
       initial="out" 
       animate="in" 
       exit="out" 
       variants={pageTransistion}>
        <Donate/>
        </motion.div>}></Route>
    </Routes>
    </AnimatePresence>
    </>
  )
}

export default App;
