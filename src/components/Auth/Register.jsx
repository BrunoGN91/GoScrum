import React, {useState, useEffect} from 'react'
import { useFormik } from 'formik'
import { Link } from 'react-router-dom'
import * as Yup from 'yup'
import './Auth.styles.css'
import { Switch, FormControlLabel } from '@mui/material'
import {useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { swalRegister } from '../../utils/Alert'
import { registerProcess, registerLoadUp } from '../../store/actions/registerAction'
import { registerSelectors } from '../../store/selectors/selectors'


export const Register = () => {
 
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const initialValues = {
    userName: '',
    password: '',
    email: '',
    role: '',
    teamID: '',
    continent: '',
    region: '',
    switch: false
  }

 

  const requiredField = "* El campo es olbigatorio"
    const validationSchema = () => 
    
    Yup.object().shape({
      userName: Yup.string().min(4, "minimo 4 caracteres").required(requiredField),
      password: Yup.string().min(4, "minimo 4 caracteres").required(requiredField),
      email: Yup.string().email("Debe ser un email válido").required(requiredField),
      role: Yup.string().required(requiredField),
      continent: Yup.string().required(requiredField),
      region: Yup.string().required(requiredField)
    })

  

    const {userName: usersNameRegistered }= useSelector( state => {
      return state.registerReducer
    })

    const handleChangeContinent = (value) => {
      setFieldValue('continent', value)
      if(value !== "America") {
        setFieldValue('region', "Otro")
      }
    }
   
    const onSubmit = () => {
      dispatch(registerProcess(values))
    }
    console.log(registerSelectors.userName)
    useEffect(() => {
      if(usersNameRegistered) {
        swalRegister(usersNameRegistered).then(() => {
          navigate('/', {replace: true})})
          dispatch(registerLoadUp())
          return;
      } 
    },[usersNameRegistered])

   
     
    const formik = useFormik({initialValues, onSubmit, validationSchema});

    const { setFieldValue, handleSubmit, handleChange, values, errors, touched, handleBlur} = formik

  return (
    <>
     <div className="auth">
      <form
       action=""
       onSubmit={handleSubmit}
       >
        <h1>Registro</h1>
        <div>
          <label id="userNameLabel" htmlFor="userName">Nombre de usuario</label>
          <input
          id="userName" 
          onChange={handleChange} 
          value={values.userName} 
          type="text" 
          name="userName"
          onBlur={handleBlur}
          className={errors.userName && touched.userName ? 'errors' : ''}
          />
        </div>
        {errors.userName && touched.userName && <span>{errors.userName}</span>}
        <div>
          <label htmlFor="">Contraseña</label>
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
        <div>
          <label htmlFor="">Email</label>
          <input 
          onChange={handleChange} 
          value={values.email} 
          type="text" 
          name="email"
          onBlur={handleBlur}
          className={errors.email && touched.email  ? 'errors' : ''}
          />
        </div>
        {errors.email && touched.email && <span>{errors.email}</span>}
        <FormControlLabel
          control={
            <Switch
            value={values.switch}
            onChange={() =>
              formik.setFieldValue("switch", !formik.values.switch)
            }
            name="switch"
            color="secondary"
            />
          }
          label="Perteneces a un equipo ya crado"
          />
        <div>
         {values.switch && (
         <>
          <label htmlFor="teamID">Por favor Introduce el identificador de equipo</label>
            <input
            name="teamID"
            onChange={handleChange}
            value={values.teamID}
            type="text"
            />
          </>
          )}
         </div>
        <div>
        <label htmlFor="">Rol</label>
          <select 
          onChange={handleChange} 
          value={values.role} 
          name="role"
          className={errors.role && touched.role ? 'errors' : ''}
          >
            <option value="">Seleccionar una opción...</option>
            <option value="Team Member">Team Member</option>
            <option value="Team Leader">Team Leader</option>
          </select>
        </div>
        {errors.role && touched.role && <span>{errors.role}</span>}
        <div>
        <label htmlFor="">Continent</label>
          <select 
          onChange={e => {handleChangeContinent(e.target.value)}} 
          value={values.continent} 
          name="continent"
          className={errors.continent && touched.continent ? 'errors' : ''}
          >
            <option value="">Seleccionar una opción</option>
            <option value="America">América</option>
            <option value="Europa">Europa</option>
            <option value="Otro">Otro</option>

          </select>
        </div>
        {errors.continent && touched.continent && <span>{errors.continent}</span>}
        {values.continent === "America" && (
          <>
          <div>
          <label htmlFor="">Región</label>
            <select 
            onChange={handleChange} 
            value={values.region} 
            name="region"
            className={errors.region && touched.region ? 'errors' : ''}
            >
              <option value="">Seleccionar una opción</option>
              <option value="Latam">Latam</option>
              <option value="Brasil">Brasil</option>
              <option value="America del Norte">America del Norte</option>
              <option value="Otro">Otro</option>
  
  
            </select>
          </div>
          {errors.region && touched.region && <span>{errors.region}</span>}
          </>
        )}
        <button
        type="submit"
        >Enviar</button>
      </form>
      <div className='register_login'><Link to="/login">Iniciar sesión</Link></div>
    </div>
    </>
  )
}

export default Register