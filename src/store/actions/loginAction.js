
import { swal } from '../../utils/Alert'


const { REACT_APP_API_ENDPOINT: API_ENDPOINT } = process.env


export const loginRequest = () => ({
    type: "LOGIN_REQUEST"
})

export const loginSuccess = (data) => ({
    type: "LOGIN_SUCCESS",
    payload: data
})

export const loginFailure = (err) => ({
    type: "LOGIN_FAILURE",
    payload: err
})


export const loginProcess = (user) => dispatch => {
   
    
    fetch(`${API_ENDPOINT}/auth/login`, { // Reemplazar usando redeux
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
        
        localStorage.setItem("token", data?.result?.token)
        localStorage.setItem("userName", data?.result?.user.userName)
       
      } else {
        swal()
      }   
      })
}
