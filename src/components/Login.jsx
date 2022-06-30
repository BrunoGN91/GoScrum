import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'


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
     <div className="container">
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
        {errors.email && <div>{errors.email}</div>}
        <div>
          <label htmlFor="">Contraseña</label>
          <input 
          onChange={handleChange} 
          value={values.password} 
          type="password" 
          name="password"/>
        </div>
        {errors.password && <div>{errors.password}</div>}
        <button
        type="submit"
        >Enviar</button>
      </form>
    </div>
    </>
  )
}

export default Login