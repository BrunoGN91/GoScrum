

const initialState= {
    loginData: '',
    error: ''
    
}

export const loginReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'LOGIN_REQUEST':
            return {
                ...state,
            }
        case 'LOGIN_SUCCESS':
            return {
                loginData: action.payload
            }
        case 'LOGIN_FAILURE':
            return {
                error: action.payload
            }
        default:
            return state
    }
}