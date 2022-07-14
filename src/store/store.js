import { applyMiddleware, createStore, combineReducers } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "@redux-devtools/extension"
import rootReducer from "./reducers/rootReducer"
import { tasksReducer } from "./reducers/tasksReducer";
import { loginReducer } from "./reducers/loginReducer";

const persistentState= {
    userName: localStorage.getItem("userName"),
    token: localStorage.getItem("token"),
    error: ''
}
export const store = createStore(combineReducers({tasksReducer, loginReducer}), persistentState, composeWithDevTools(applyMiddleware(thunk)))

store.subscribe(() => {
        const { loginReducer } = store.getState();
        localStorage.setItem('userName', loginReducer.userName);
        localStorage.setItem('token', loginReducer.token);
    });