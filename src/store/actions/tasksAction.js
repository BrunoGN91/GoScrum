import { TASKS_REQUEST, TASKS_FAILURE, TASKS_SUCCESS } from '../types'

const { REACT_APP_API_ENDPOINT: API_ENDPOINT } = process.env

export const tasksRequest = () => ({
    type: TASKS_REQUEST,
})

export const tasksSuccess = (data) => ({
    type: TASKS_SUCCESS,
    payload: data,
})

export const tasksFailure = (error) => ({
    type: TASKS_FAILURE,
    payload: error,
})

export const getTasks = (path) => dispatch => {
    dispatch(tasksRequest())
    fetch(`${API_ENDPOINT}/task/${path}`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: "Bearer " + localStorage.getItem("token")
        }
    })
    .then(res => res.json())
    .then(data => dispatch(tasksSuccess(data.result)))
    .catch(err => dispatch(tasksFailure(err)))
}