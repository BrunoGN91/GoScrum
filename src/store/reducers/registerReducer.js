import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE, RESET } from '../types'
import { swalRegisterCredentials, swalRegister } from '../../utils/Alert'

const initialState= {
    validate: false,
    userName: '',
    error: ''
}

export const registerReducer = (state = initialState, action) => {
    
    switch(action.type) {
        case RESET:
            return initialState
        case REGISTER_REQUEST:
            return {
                ...state,
                validate: true
            }
        case REGISTER_SUCCESS:
            return {
                validate: false,
                userName: action.payload.userName,
            }
        case REGISTER_FAILURE:
            return {
                error: swalRegisterCredentials()
            }
        default:
            return state
    }
}