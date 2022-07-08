import { applyMiddleware, configureStore } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "@redux-devtools/extension"
import rootReducer from "./reducers/rootReducer"

export const store = configureStore(rootReducer,
    
    composeWithDevTools(applyMiddleware(thunk)))