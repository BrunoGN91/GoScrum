import React, {useEffect, useState} from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useFormik } from 'formik'
import './Auth.styles.css'
import * as Yup from 'yup'
import { swal } from '../../utils/Alert'
import { useSelector, useDispatch } from 'react-redux'
import { loginProcess } from '../../store/actions/loginAction'


const axiosConfig = {
  headers: {
      'Content-Type' : 'application/json',
      "Accept": "Token",
      "Access-Control-Allow-Origin": "*",

  }
};

const Login = () => {

  const initialValues = {
    userName: '',
    password: ''
  }
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const requiredField = "* El campo es olbigatorio"
  const validationSchema = () => 
    
  Yup.object().shape({
    userName: Yup.string().min(4, "minimo 4 caracteres").required(requiredField),
    password: Yup.string().min(4, "minimo 4 caracteres").required(requiredField)
  })
   

    // const { userName, token} = useSelector(state => {
    //   return state.loginReducer
    // })

    const onSubmit = () => {
      dispatch(loginProcess(values))
      navigate('/', { replace: true})
    }
    


    const formik = useFormik({initialValues, validationSchema, onSubmit});

    const { handleSubmit, handleChange, values, touched, handleBlur, errors} = formik

  return (
    <>
     <div className="auth">
      <form
       action=""
       onSubmit={handleSubmit}
       >
        <h1>Iniciar sesión</h1>
        <div>
          <label id="loginUserName" htmlFor="userName">Username</label>
          <input 
          id="userName"
          onChange={handleChange} 
          value={values.userName} 
          type="text" 
          name="userName"
          className={errors.userName && touched.userName ? 'errors' : ''}
          onBlur={handleBlur}
          />
        </div>
        {errors.userName && touched.userName && <span>{errors.userName}</span>}
        <div>
          <label htmlFor="password" id="loginPassword" >Contraseña</label>
          <input 
          onChange={handleChange} 
          value={values.password} 
          type="password" 
          name="password"
          onBlur={handleBlur}
          className={errors.password && touched.password ? 'errors' : ''}
          />
        </div>
        {errors.password && touched.password && <span>{errors.password}</span>}
        <button
        type="submit"
        >Enviar</button>
      </form>
      <div className='register_login'><Link to="/register">Registrarme</Link></div>

    </div>
    </>
  )
}

export default Login