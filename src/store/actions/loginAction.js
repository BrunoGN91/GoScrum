import { Navigate } from 'react-router-dom'
import { swal } from '../../utils/Alert'
import { LOGIN_SUCCESS, LOGIN_FAILURE } from '../types'

const { REACT_APP_API_ENDPOINT: API_ENDPOINT } = process.env

export const loginSuccess = (data) => ({
    type: LOGIN_SUCCESS,
    payload: data
})

export const loginFailure = (err) => ({
    type: LOGIN_FAILURE,
    payload: err
})


export const loginProcess = (user) => dispatch => {
    fetch(`${API_ENDPOINT}/auth/login`, { 
        method: "POST",
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            userName: user.userName,
            password: user.password
          })
      }).then(res => res.json())
        .then(data => {
      if(data?.status_code === 200) {
        dispatch(loginSuccess(data?.result))
        
      } else {
        swal()
      }   
      })
}

