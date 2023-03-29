import { createSlice } from '@reduxjs/toolkit';
import { addContact, deleteContact, fetchContacts } from './api';



const initialState ={
  contacts: {
    items: [],
    isLoading: false,
    error: null
  },
  filter: "",
};

export const mySlice = createSlice({
  name: "contacts",
  initialState,
  reducers:{
    updateFilter(state,action){
      state.filter = action.payload
    },
  },
  extraReducers:{
    [fetchContacts.fulfilled]:(state,action)=>{
      state.contacts.items = action.payload
      state.loading = false
    },
    [fetchContacts.pending]:(state)=>{
      state.loading = true
    },
    [fetchContacts.rejected]:(state,action)=>{
      state.error = action.error.message;
      alert(state.error)
      state.loading = false
    },
    [addContact.fulfilled]:(state,action)=>{
      state.contacts.items.push(action.meta.arg)
      state.loading = false
    },
    [addContact.pending]:(state)=>{
      state.loading = true
    },
    [addContact.rejected]:(state,action)=>{
      state.error = action.error.message;
      alert(state.error)
      state.loading = false
    },
    [deleteContact.fulfilled]:(state,action)=>{
      state.contacts.items =  state.contacts.items.filter(el => el.id !== action.meta.arg)
      state.loading = false
    },
    [deleteContact.pending]:(state)=>{
      state.loading = true
    },
    [deleteContact.rejected]:(state,action)=>{
      state.error = action.error.message;
      alert(state.error)
      state.loading = false
    },
  },
})

export const { updateFilter  } = mySlice.actions;
