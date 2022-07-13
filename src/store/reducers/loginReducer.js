import { LOGIN_SUCCESS, LOGIN_FAILURE } from '../types'



const initialState= {
    userName: '',
    token: '',
    error: ''
    
}

export const loginReducer = (state = initialState, action) => {
    
    switch(action.type) {
        case LOGIN_SUCCESS:
            return {
                userName: action.payload.user.userName,
                token:  action.payload.token
            }
        case LOGIN_FAILURE:
            return {
                error: action.payload
            }
        default:
            return state
    }
}