import { composeWithDevTools } from "redux-devtools-extension"
import { AssignmentsReducer } from './AssignmentsState';
import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from './AuthState';




const reducer = combineReducers({
    AssignmentsState: AssignmentsReducer,
    authState: authReducer
});

const store = configureStore({
    reducer,
    enhancers: [composeWithDevTools()]
});
export default store