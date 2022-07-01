import React from 'react'
import './TaskForm.styles.css'
import {useFormik } from 'formik'

const TaskForm = () => {


    const initialValues = {
      title: '',
      status: '',
      priority: '',
      description: '',
    }
  
      const onSubmit = (e) => {
        alert('ok')
      }
  
      const formik = useFormik({initialValues, onSubmit});
  
      const { handleSubmit, handleChange} = formik
  


  return (
    <section className ="task_form">
        <h2>Crear tarea</h2>
        <p>Crea tus tareas</p>
        <form 
        action=""
        onSubmit={handleSubmit}>
            <div>
                <div>
                    <input 
                    name='title'
                    type="text" 
                    onChange={handleChange}
                    />
                </div>
                <div>
                <select
                onChange={handleChange}
                name="status">
                        <option value="" >Seleccionar opción</option>
                        <option value="new">Nueva</option>
                        <option value="inProcess">En proceso</option>
                        <option value="finished">Terminada</option>
                </select>
                </div>
                <div>
                <select
                onChange={handleChange}
                name="priority">
                        <option value="" >Seleccionar opción</option>
                        <option value="low">Baja</option>
                        <option value="medium">Media</option>
                        <option value="high">Alta</option>
                </select>
                </div>
            </div>
            <div>
                <textarea 
                onChange={handleChange} 
                name="description" 
                id="" 
                cols="30" 
                rows="10"
                placeholder='Descripción'
                ></textarea>
            </div>
            <button type='submit'>Crear</button>
        </form>
    </section>
  )
}

export default TaskForm