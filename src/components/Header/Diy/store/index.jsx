import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import {authApi} from "./authApi";
import { authSlice } from "./authReducer";

const store= configureStore({
    reducer:{
        [authApi.reducerPath] :authApi.reducer,
        auth:authSlice.reducer
    },
    middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware)
});
setupListeners(store.dispatch)
export default store

