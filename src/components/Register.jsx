import React, {useState} from 'react'
import { useFormik } from 'formik'

const Register = () => {
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const initialValues = {
    email: '',
    password: ''
  }

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
      e.preventDefault()
       alert("Hola")
        
    }

    const formik = useFormik({initialValues, onSubmit});

    const { handleSubmit, handleChange, values, errors} = formik

  return (
    <>
     <div className="container">
      <form
       action=""
       onSubmit={handleSubmit}
       >
        <h1>Registro</h1>
        <div>
          <label htmlFor="">Nombre de usuario</label>
          <input 
          onChange={handleChange} 
          value={values.userName} 
          type="text" 
          name="userName"/>
        </div>
        {errors.userName && <div>{errors.userName}</div>}
        <div>
          <label htmlFor="">Contraseña</label>
          <input 
          onChange={handleChange} 
          value={values.password} 
          type="password" 
          name="password"/>
        </div>
        {errors.password && <div>{errors.password}</div>}
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
        <label htmlFor="">Rol</label>
          <select onChange={handleChange} value={values.rol} name="role">
            <option value="teamMember">Team Member</option>
            <option value="teamLeader">Team Leader</option>
          </select>
        </div>
        {errors.role && <div>{errors.role}</div>}
        <div>
        <label htmlFor="">Continent</label>
          <select onChange={handleChange} value={values.continent} name="continent">
            <option value="America">América</option>
            <option value="Europa">Europa</option>
            <option value="Otro">Otro</option>

          </select>
        </div>
        {errors.continent && <div>{errors.continent}</div>}
        <div>
        <label htmlFor="">Región</label>
          <select onChange={handleChange} value={values.region} name="region">
            <option value="Latam">Latam</option>
            <option value="Brasil">Brasil</option>
            <option value="America del Norte">America del Norte</option>
            <option value="Otro">Otro</option>


          </select>
        </div>
        {errors.region && <div>{errors.region}</div>}
        <button
        type="submit"
        >Enviar</button>
      </form>
    </div>
    </>
  )
}

export default Register