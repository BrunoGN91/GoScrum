
import './App.css';

const App = () => {
  return (
    <>
    <div className="container">
      <form action="">
        <h1>Iniciar sesión</h1>
        <div>
          <label htmlFor="">Email</label>
          <input type="email" name="email"/>
        </div>
        <div>
          <label htmlFor="">Contraseña</label>
          <input type="password" name="password"/>
        </div>
        <button>Enviar</button>
      </form>
    </div>
    </>
  )
}

export default App;
