import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    status: 'light'
}

const modeSlice = createSlice({
    name: 'mode',
    initialState,
    reducers: {
        changeMode: (state) => {
            state.status = state.status === "dark" ? "light" : "dark"
        }
    }
})

export const {changeMode} = modeSlice.actions;
export default modeSlice.reducer;