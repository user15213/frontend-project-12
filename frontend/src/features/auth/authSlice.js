import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/api/v1/login', { username, password })

      localStorage.setItem('token', data.token)

      axios.defaults.headers.common.Authorization = `Bearer ${data.token}`
      return data.token
    } catch (err) {

        return rejectWithValue(err.response?.data?.message || 'Ошибка авторизации')
    }
  }
)

const initialState = {
  token: localStorage.getItem('token') || null,
  status: 'idle',
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.token = null
      localStorage.removeItem('token')
      delete axios.defaults.headers.common.Authorization
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loginUser.pending, state => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.token = action.payload
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
  },
})

export const { logout } = authSlice.actions
export default authSlice.reducer
