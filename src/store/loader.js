import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
}

export const LoaderStore = createSlice({
  name: 'LoaderStore',
  initialState,
  reducers: {
    setLoader: (state, action) => {
      state.loading = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setLoader } = LoaderStore.actions

export default LoaderStore.reducer