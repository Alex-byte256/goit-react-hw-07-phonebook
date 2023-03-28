import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchContacts = createAsyncThunk(
  "contacts/fetchContacts",
  async ()=>{
    const contactsList = await  axios.get("https://6423405277e7062b3e2e9d05.mockapi.io/contacts").then(el=>el.data)
    return contactsList;
  }
)

export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (userData)=>{
    await axios.post("https://6423405277e7062b3e2e9d05.mockapi.io/contacts",{
      ...userData
    })
  }
)

export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (id)=>{
    await axios.delete(`https://6423405277e7062b3e2e9d05.mockapi.io/contacts/${id}`)
  }
)
