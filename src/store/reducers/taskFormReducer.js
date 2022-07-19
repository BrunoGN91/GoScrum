import { TASKFORM_FAILURE, TASKFORM_SUCCESS } from '../types'



const initialState= {
    
    
}

export const taskFormReducer = (state = initialState, action) => {
    
    switch(action.type) {
        case TASKFORM_SUCCESS:
           
            return {
               
            }
        case TASKFORM_FAILURE:
            return {
               
            }
        default:
            return state
    }
}