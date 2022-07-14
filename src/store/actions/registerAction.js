
import { v4 as uuidv4 } from 'uuid';
import { swalRegister } from '../../utils/Alert'


import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE } from '../types'

const { REACT_APP_API_ENDPOINT: API_ENDPOINT } = process.env

export const registerSuccess = (data) => ({
    type: REGISTER_REQUEST,
    payload: data
})

export const registerFailure = (err) => ({
    type: REGISTER_FAILURE,
    payload: err
})


export const registerProcess = (userValues) => dispatch => {
    const teamId = !userValues.teamID ? uuidv4() : userValues.teamID
    fetch(`${API_ENDPOINT}/auth/register`, { // Reemplazar usando redeux
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
    dispatch(registerSuccess(data?.result?.user))
     console.log(data?.result);
     swalRegister(data?.result?.user.userName)
     // navigate('/registered/' + data?.result.user.teamID, { replace: true})
   })
}