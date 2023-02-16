import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { SERVER_URL } from "../../utils";

const initialState = {
    userData: null,
    token: null,
    status: 'idle',
    error: '',
    searchUser: '',
}

export const registerUser = createAsyncThunk('user/registerUser', async(formData, {rejectWithValue}) => {

    try {
        const response = await axios({
            method: 'POST',
            url: `${SERVER_URL}/auth/register`,
            data: formData,
            headers: {'Content-Type': `multipart/form-data`,}
          })
          console.log(response)
          return response.data
    } catch (error) {
        console.log(error.response)
        return rejectWithValue(error.response?.data?.message)
    }
})

export const loginUser = createAsyncThunk('user/login',async(formData,{rejectWithValue}) => {
    try {
        const response = await axios({
            method: 'POST',
            url: `${SERVER_URL}/auth/login`,
            data: formData,
          })
          console.log(response)
          return response.data
    } catch (error) {
        // console.log(error)
        console.log(error.response)
        return rejectWithValue(error.response?.data?.message)
    }
})

export const addRemoveFriend = createAsyncThunk('user/addRemoveFriend',async(payload,{rejectWithValue}) => {
    try {
        const response = await axios({
            method: 'PATCH',
            url: `${SERVER_URL}/users/${payload.userId}/${payload.friendId}`,
            headers: {
                'Authorization': `Bearer ${payload.token}`
            }
          })
          console.log(response)
          return response.data
    } catch (error) {
        console.log(error)
        return rejectWithValue(error)
    }
})

export const fetchSingleUser = createAsyncThunk('user/fetchSingleUser',async(payload,{rejectWithValue}) => {
    try {
        const response = await axios({
            method: 'GET',
            url: `${SERVER_URL}/users/${payload.id}`,
            headers: {
                "Authorization": `Bearer ${payload.token}`
            }
          })
          console.log(response)
          return response.data
    } catch (error) {
        console.log(error)
        return rejectWithValue(error)
    }
})

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setError: (state,action) => {
            state.error = action.payload
        },
        logOut : (state) => {
        state.userData = null
            state.token = null
        },
        changeSearchUser: (state,action) => {
            state.searchUser = action.payload
        }
     },
    extraReducers: (builder) => {
        //register
        builder.addCase(registerUser.pending,(state) => {
            state.status = 'loading'
            state.error = ''
        })
        builder.addCase(registerUser.fulfilled,(state,action) => {
            console.log(action.payload)
            state.status = "success"
            state.userData = action.payload?.user
            state.token = action.payload?.token
            state.error = ''
        })
        builder.addCase(registerUser.rejected,(state,action) => {
            console.log(action.error)
            state.status = "error"
            state.error = action.error.message
        })
        //login
        builder.addCase(loginUser.pending,(state) => {
            state.status = 'loading'
            state.error = ''
        })
        builder.addCase(loginUser.fulfilled,(state,action) => {
            console.log(action.payload)
            state.status = "success"
            state.userData = action.payload?.user
            state.token = action.payload?.token
            state.error = ''
        })
        builder.addCase(loginUser.rejected,(state,action) => {
            console.log(action.error)
            state.status = "error"
            state.error = action.error
        })
        //addRemoveFriend
        builder.addCase(addRemoveFriend.fulfilled,(state,action) => {
            state.userData.friends = action.payload
        })
        
        //fetchASingleUser
        builder.addCase(fetchSingleUser.pending,(state) => {
            state.status = 'loading'
            state.error = ''
        })
        builder.addCase(fetchSingleUser.fulfilled,(state,action) => {
            console.log(action.payload)
            state.status = "success"
            state.userData = action.payload
            state.error = ''
        })
        builder.addCase(fetchSingleUser.rejected,(state,action) => {
            console.log(action.error)
            state.status = "error"
            state.error = action.error.message
        })
    }
})

//selectors 
export const getToken = (state) => state.user.token
export const getUserId = (state) => state.user.userData._id
export const getSearchUser = (state) => state.user.searchUser



export const {
    logOut,
    setError,
    changeSearchUser
} = userSlice.actions

export default userSlice.reducer