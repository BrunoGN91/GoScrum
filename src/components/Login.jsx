import React, {useState} from 'react'

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        
    }

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
          onChange={(e) => setEmail(e.target.value)} 
          value={email} 
          type="email" 
          name="email"/>
        </div>
        <div>
          <label htmlFor="">Contraseña</label>
          <input 
          onChange={(e) => setPassword(e.target.value)} 
          value={password} 
          type="password" 
          name="password"/>
        </div>
        <button
        type="submit"
        >Enviar</button>
      </form>
    </div>
    </>
  )
}

export default Login