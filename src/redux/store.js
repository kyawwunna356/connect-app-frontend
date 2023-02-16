import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {  persistReducer } from 'redux-persist';
import storage from "redux-persist/lib/storage";
import modeReducer from "./features/modeSlice";
import userReducer from './features/userSlice';
import postReducer from './features/postSlice';
import conversationReducer from "./features/conversation";

const persistConfig={
    key:'root',
    storage,
    }

const rootReducer = combineReducers({
    mode: modeReducer,
    user: userReducer,
    posts: postReducer,
    conversations: conversationReducer
    
})
const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
      })
}) 