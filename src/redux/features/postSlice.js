import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { SERVER_URL } from "../../utils";

const initialState = {
    postData: null,
    status: 'idle',
    postAddStatus: 'idle',
    postAddError: 'idle',
    error: ''
}
//feedPosts
export const fetchFeedPosts = createAsyncThunk('posts/fetchFeedPosts', async (payload,{rejectWithValue}) => {
    const {token} = payload
    try {
        const response = await axios.get(`${SERVER_URL}/posts`,{
            headers: { 'Authorization': `Bearer ${token}` }
        })
        return response.data
    } catch (error) {
        console.log(error)
        return rejectWithValue(error)
    }
})

//userSpecific posts
export const fetchUserPosts = createAsyncThunk('posts/fetchUserPosts', async (payload,{rejectWithValue}) => {
    const {token,userId} = payload
    try {
        const response = await axios.get(`${SERVER_URL}/posts/${userId}/posts`,{
            headers: { 'Authorization': `Bearer ${token}` }
        })
        return response.data
    } catch (error) {
        console.log(error)
        return rejectWithValue(error)
    }
})

//add a post
export const addPost = createAsyncThunk('posts/addPost', async (payload,{rejectWithValue}) => {
    try {
        const response = await axios({
            url: `${SERVER_URL}/posts`,
            method: "POST",
            data: payload.formData,
            headers: {
                "Authorization": `Bearer ${payload.token}`
            }
        })
        return response.data
    } catch (error) {
        console.log(error)
        return rejectWithValue(error)
    }
})


//likes
export const toggleLikePost = createAsyncThunk('posts/toggleLikePost', async(payload,{rejectWithValue}) => {
    try {
        const response = await axios({
            url: `${SERVER_URL}/posts/${payload.postId}`,
            method: "patch",
            data: {userId: payload.userId},
            headers: {
                "Authorization": `Bearer ${payload.token}`
            }
        })
        return response.data
    } catch (error) {
        console.log(error)
        return rejectWithValue(error)
    }
})


//write comment (pending..........)
export const writeComment = createAsyncThunk('posts/writeComment', async(payload) => {
    try {
        const response = await axios({
            url: `${SERVER_URL}/posts/comment/${payload.postId}`,
            method: "patch",
            data: {
                userId: payload.userId,
                text: payload.text
            },
            headers: {
                "Authorization": `Bearer ${payload.token}`
            }
        })
        return response.data
    } catch (error) {
        console.log(error)
    }
})

//delete Post 
export const deletePost = createAsyncThunk('posts/delete', async(payload,{rejectWithValue}) => {
    try {
        const response = await axios({
            url: `${SERVER_URL}/posts/${payload.postId}`,
            method: "delete",
            headers: {
                "Authorization": `Bearer ${payload.token}`
            }
        })
        return response.data
    } catch (error) {
        console.log(error)
        return rejectWithValue(error)
    }
})



const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        //feedPosts
        builder.addCase(fetchFeedPosts.pending,(state) => {
            state.status = "loading"
        })
        builder.addCase(fetchFeedPosts.fulfilled,(state,action) => {
            state.status = "success"
            state.postData = action.payload
            state.error = ''
        })
        builder.addCase(fetchFeedPosts.rejected,(state,action) => {
            state.status = "error"
            state.error = action.error.message
        })
        //UserSpecific Posts
        builder.addCase(fetchUserPosts.pending,(state) => {
            state.status = "loading"
        })
        builder.addCase(fetchUserPosts.fulfilled,(state,action) => {
            state.status = "success"
            state.postData = action.payload
            state.error = ''
        })
        builder.addCase(fetchUserPosts.rejected,(state,action) => {
            state.status = "error"
            state.error = action.error.message
        })
        //addPosts
        builder.addCase(addPost.pending,(state) => {
            state.postAddStatus = "loading"
        })
        builder.addCase(addPost.fulfilled,(state,action) => {
            state.postAddStatus = "success"
            state.postData.unshift(action.payload)
            state.postAddError = ''
        })
        builder.addCase(addPost.rejected,(state,action) => {
            state.postAddStatus = "error"
            state.postAddError = action.error.message
        })

        //toggle Like
        builder.addCase(toggleLikePost.fulfilled,(state,action) => {
            state.postData = state.postData.map(post => {
                if(post._id === action.payload._id){
                    return action.payload
                } else {
                    return post
                }
            })
        })
        //comment
        builder.addCase(writeComment.fulfilled,(state,action) => {
            state.postData = state.postData.map(post => {
                if(post._id === action.payload._id){
                    return action.payload
                }  else {
                    return post
                }
            })
        })
        //delete
        builder.addCase(deletePost.fulfilled,(state,action) => {
            state.postData = state.postData.filter(post => {
                if(post._id !== action.payload._id){
                    return action.payload
                } 
            })
        })

    }
})

export default postSlice.reducer