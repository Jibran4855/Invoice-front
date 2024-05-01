import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: {},
  loggedIn: false
}

export const AuthStore = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
    userHasAuthenticated: (state, action) => {
      state.loggedIn = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setUser, userHasAuthenticated } = AuthStore.actions

export default AuthStore.reducer