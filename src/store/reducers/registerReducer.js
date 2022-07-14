import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE } from '../types'

const initialState= {
    userName: '',
    password: '',
    email: '',
    teamID: '',
    role: '',
    continent: '',
    region: ''
    
}

export const registerReducer = (state = initialState, action) => {
    
    switch(action.type) {
        case REGISTER_SUCCESS:
           
            return {
                userName: action.payload.userName,
                password: action.payload.password,
                email: action.payload.email,
                teamID: action.payload.teamId,
                role: action.payload.role,
                continent: action.payload.continent,
                region: action.payload.region
            }
        case REGISTER_FAILURE:
            return {
                error: action.payload
            }
        default:
            return state
    }
}