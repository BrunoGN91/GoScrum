
import { v4 as uuidv4 } from 'uuid';
import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE, RESET } from '../types'

const { REACT_APP_API_ENDPOINT: API_ENDPOINT } = process.env

export const registerReset = () => ({
  type: RESET
})
export const registerRequest = () => ({
  type: REGISTER_REQUEST
})
export const registerSuccess = (data) => ({
    type: REGISTER_SUCCESS,
    payload: data
})

export const registerFailure = () => ({
    type: REGISTER_FAILURE,
   
})

export const registerLoadUp = () => dispatch => {
  dispatch(registerReset())
}

export const registerProcess = (userValues) => dispatch => {
    const teamId = !userValues.teamID ? uuidv4() : userValues.teamID
    dispatch(registerRequest())
    fetch(`${API_ENDPOINT}/auth/register`, { 
     method: "POST",
     headers: {
       'Content-Type' : 'application/json'
     },
     body: JSON.stringify({
       user: {
         userName: userValues.userName,
         password: userValues.password,
         email: userValues.email,
         teamID: teamId,
         role: userValues.role,
         continent: userValues.continent,
         region: userValues.region
       }
     })
   }).then(res => res.json())
     .then(data => {
        if(data?.status_code === 201) {
            dispatch(registerSuccess(data?.result?.user))
        } else if (data?.status_code === 409){
            dispatch(registerFailure())
        } 
   }).catch(() => {
    const fetchError = new Error(400)
    return fetchError
   })
}