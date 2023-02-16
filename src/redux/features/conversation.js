import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { SERVER_URL } from "../../utils";

const initialState = {
    data: [],
    selectedConversation: {},
    status: 'idle'
}

//fetch all conversation
export const fetchConversations = createAsyncThunk('conversations/fetchConversations', async (payload,{rejectWithValue}) => {
    const {token,userId} = payload
    try {
        const response = await axios.get(`${SERVER_URL}/conversation/${userId}`,{
            headers: { 'Authorization': `Bearer ${token}` }
        })
        return response.data
    } catch (error) {
        console.log(error)
        return rejectWithValue(error)
    }
})
// const sendMessage = async () => {
//     const res = await axios({
//       method: 'post',
//       url : `${SERVER_URL}/message/${selectedConversation._id}`,
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//       data: {
//         sender: _id,
//         message: input
//       }
//     });
//     setMessages(prevState => [...prevState,res.data]);
//     setInput('')
//   };

//   sendMessage();

//post a conversation
export const createConversation = createAsyncThunk('conversations/createConversations', async (payload,{rejectWithValue}) => {
    const {userId,friendId,token} = payload
    try {
        const response = await axios({
            url: `${SERVER_URL}/conversation`,
            method: 'post',
            headers: { 'Authorization': `Bearer ${token}` },
            data: {
                userId,
                friendId,
            }
        })
        console.log(response.data)
        return response.data
    } catch (error) {
        console.log(error)
        return rejectWithValue(error)
    }
})

//delete conversation
export const deleteConversation = createAsyncThunk('conversations/deleteConversation', async (payload,{rejectWithValue}) => {
    const {token,converId} = payload
    try {
        const response = await axios.delete(`${SERVER_URL}/conversation/${converId}`,{
            headers: { 'Authorization': `Bearer ${token}` }
        })
        return response.data
    } catch (error) {
        console.log(error)
        return rejectWithValue(error)
    }
})


const conversationSice = createSlice({
    name: 'conversations',
    initialState,
    reducers: {
        selectConver: (state,action) => {
            state.selectedConversation = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchConversations.pending,(state) => {
            state.status = "loading"
        })
        builder.addCase(fetchConversations.fulfilled,(state,action) => {
            state.status = "success"
            state.data = action.payload
            state.error = ''
        })
        builder.addCase(fetchConversations.rejected,(state,action) => {
            state.status = "error"
            state.error = action.error.message
        })
        builder.addCase(deleteConversation.fulfilled,(state,action) => {
            state.data = state.data.filter(conver => conver._id !== action.payload._id)
            state.selectedConversation = {}
        })
        builder.addCase(createConversation.fulfilled,(state,action) => {
            state.data.push(action.payload)
            state.error = ''
        })
        builder.addCase(createConversation.rejected,(state,action) => {
            state.status = "error" 
            state.error = action.error.message
        })
        builder.addCase('user/logOut',(state,action) => {
            state = initialState
            return state
        })
    }
})

//selectors 
export const getConversations = (state) => state.conversations
export const getSelectedConversation = (state) => state.conversations.selectedConversation

export const {selectConver} = conversationSice.actions
export default conversationSice.reducer