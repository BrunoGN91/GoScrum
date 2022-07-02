import React, {useState} from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useFormik } from 'formik'
import './Auth.styles.css'

const Login = () => {
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const initialValues = {
    email: '',
    password: ''
  }
  const navigate = useNavigate()
  const validate = (values) => {
    const errors = {}

    if(!values.email) {
      errors.email = "El email es requerido"
    }
    if(!values.password) {
      errors.password = "La password no puede estar vacía"
    }

    return errors
  }


    const onSubmit = (e) => {
      
       localStorage.setItem("logged", "yes");
       navigate('/', {replace: true})
    }

    const formik = useFormik({initialValues, validate, onSubmit});

    const { handleSubmit, handleChange, values, errors} = formik

  return (
    <>
     <div className="auth">
      <form
       action=""
       onSubmit={handleSubmit}
       >
        <h1>Iniciar sesión</h1>
        <div>
          <label htmlFor="">Email</label>
          <input 
          onChange={handleChange} 
          value={values.email} 
          type="email" 
          name="email"/>
        </div>
        {errors.email && <span>{errors.email}</span>}
        <div>
          <label htmlFor="">Contraseña</label>
          <input 
          onChange={handleChange} 
          value={values.password} 
          type="password" 
          name="password"/>
        </div>
        {errors.password && <span>{errors.password}</span>}
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