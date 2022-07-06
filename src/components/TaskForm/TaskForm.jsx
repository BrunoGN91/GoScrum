
import React, {useState, useEffect} from 'react'
import './TaskForm.styles.css'
import { useNavigate } from 'react-router-dom'
import {useFormik, validateYupSchema } from 'formik'
import * as Yup from 'yup'
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const TaskForm = () => {
    const requiredField = "* El campo es olbigatorio"
    const validationSchema = () => 
    
    Yup.object().shape({
      title: Yup.string().min(5, "* El título debe tener al menos 5 caracteres").required(requiredField),
      status: Yup.string().required(requiredField),
      importance: Yup.string().required(requiredField),
      description: Yup.string().required(requiredField)

    })
    
    const navigate = useNavigate()
    const initialValues = {
      title: '',
      status: '',
      importance: '',
      description: '',
    }
  
      
  
  
      const onSubmit = (e) => {
        fetch(`${process.env.REACT_APP_API_ENDPOINT}/task`, {
         method: "POST",
         headers: {
          'Content-Type' : 'application/json',
          Authorization: `Bearer ${localStorage.getItem("token")}`,
         },
         body: JSON.stringify({task: {
          title: values.title,
          status: values.status,
          importance: values.importance,
          description: values.description
         }})
       }).then(res => res.json()
       ).then(data => {
        resetForm()
        toast("Tu tarea se creo")
       })
       
     }
     const formik = useFormik({initialValues, onSubmit, validationSchema });
     const { resetForm, handleSubmit, handleChange, errors, touched, handleBlur, values} = formik



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
                    value={values.title}
                    className={errors.title && errors.title ? "errors" : ''}
                    />
                    {errors.title && touched.title && <span>{errors.title}</span>}
                </div>
                
                <div>
                <select
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.status}
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
                value={values.importance}
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
                value={values.description}
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
        <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        />
    </section>
  )
}

export default TaskForm