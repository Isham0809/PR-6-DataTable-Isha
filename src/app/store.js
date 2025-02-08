import { configureStore } from "@reduxjs/toolkit";
import  counterSlice  from "../feature/counter/counterSlice";
import  todosSlice  from "../feature/todos/todoSlice";
import authSlice from "../feature/authentication/authSlice";



export const store = configureStore({
    reducer:{
        counter: counterSlice,
        todos:todosSlice,
        auth:authSlice,
    }
})