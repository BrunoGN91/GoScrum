import { TASKFORM_REQUEST, TASKFORM_SUCCESS, TASKFORM_FAILURE } from '../types'
import { toast } from 'react-toastify';

const { REACT_APP_API_ENDPOINT: API_ENDPOINT } = process.env

export const taskFormSuccess = () => ({
  type: TASKFORM_SUCCESS,
 
})

export const taskFormFailure = () => ({
  type: TASKFORM_FAILURE,
 
})

export const taskFormProcess = (taskValues) => dispatch => {
    fetch(`${API_ENDPOINT}/task`, {
        method: "POST",
        headers: {
         'Content-Type' : 'application/json',
         Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({task: {
         title: taskValues.title,
         status: taskValues.status,
         importance: taskValues.importance,
         description: taskValues.description
        }})
      }).then(res => res.json()
      ).then(data => {
        toast("Tu Tarea se creó con éxito!")
      }).catch(() => {
        dispatch(taskFormFailure())
      })
}