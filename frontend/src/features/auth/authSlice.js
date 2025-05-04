import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../api/axios'


export const signupUser = createAsyncThunk(
  'auth/signupUser',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/api/v1/signup', { username, password })
      localStorage.setItem('token', data.token)
      return data.token
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Ошибка регистрации')
    }
  }
)


export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/api/v1/login', { username, password })
      localStorage.setItem('token', data.token)

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
    },
  },
  extraReducers: builder => {
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

      .addCase(signupUser.pending, state => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.token = action.payload
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
  },
})

export const { logout } = authSlice.actions
export default authSlice.reducer
