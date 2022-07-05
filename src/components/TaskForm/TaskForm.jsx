import React from 'react'
import './TaskForm.styles.css'
import {useFormik } from 'formik'
import * as Yup from 'yup'

const TaskForm = () => {
    const requiredField = "* El campo es olbigatorio"
    const validationSchema = () => 
    
    Yup.object().shape({
      title: Yup.string().min(5, "* El título debe tener al menos 5 caracteres").required(requiredField),
      status: Yup.string().required(requiredField),
      importance: Yup.string().required(requiredField),
      description: Yup.string().required(requiredField)

    })
    

    const initialValues = {
      title: '',
      status: '',
      importance: '',
      description: '',
    }
  
      const onSubmit = (e) => {
        alert('ok')
      }
  
      const formik = useFormik({initialValues, onSubmit, validationSchema });
  
      const { handleSubmit, handleChange, errors, touched, handleBlur} = formik
  


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
                    onBlur={handleBlur}
                    className={errors.title && errors.title ? "errors" : ''}
                    />
                    {errors.title && touched.title && <span>{errors.title}</span>}
                </div>
                
                <div>
                <select
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.status && errors.status ? "errors" : ''}
                name="status">
                        <option value="" >Seleccionar opción</option>
                        <option value="NEW">Nueva</option>
                        <option value="IN PROGRESS">En proceso</option>
                        <option value="FINISHED">Terminada</option>
                </select>   
                {errors.status && touched.status && <span>{errors.status}</span>}          
                </div>
                
                <div>
                <select
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.importance && touched.importance ? "errors" : ''}
                name="importance">
                        <option value="" >Seleccionar opción</option>
                        <option value="LOW">Baja</option>
                        <option value="MEDIUM">Media</option>
                        <option value="HIGH">Alta</option>
                </select>   
                {errors.importance && touched.importance && <span>{errors.importance}</span>}          
                </div>
                
            </div>
            <div>
                <textarea 
                onChange={handleChange} 
                name="description" 
                id="" 
                cols="30" 
                rows="10"
                onBlur={handleBlur}
                className={errors.description && touched.description ? "errors" : ''}
                placeholder='Descripción'
                ></textarea>
                {errors.description && touched.description && <span>{errors.description}</span>}          
            </div>
            <button type='submit'>Crear</button>
        </form>
    </section>
  )
}

export default TaskForm