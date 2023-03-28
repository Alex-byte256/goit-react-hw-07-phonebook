import {  configureStore } from '@reduxjs/toolkit'
import {mySlice} from './reducers';




export const store = configureStore({
  reducer: {
    contacts :mySlice.reducer
  },
})

