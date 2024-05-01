import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    error: false,
    success: false,
    message: 'test',
}

export const AlertStore = createSlice({
    name: 'LoaderStore',
    initialState,
    reducers: {
        setError: (state, action) => {
            state.error = true
            state.message = action.payload
        },
        setSuccess: (state, action) => {
            state.success = true
            state.message = action.payload
        },
        setAlertDefault: (state) => {
            state.success = false
            state.error = false
            state.message = ''
        },
    },
})

// Action creators are generated for each case reducer function
export const { setError, setSuccess, setAlertDefault } = AlertStore.actions

export default AlertStore.reducer