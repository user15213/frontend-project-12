import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../api/axios'

export const fetchMessages = createAsyncThunk(
  'messages/fetchMessages',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/api/v1/messages')
      return data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message)
    }
  }
)

const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {

  },
  extraReducers: builder => {
    builder
      .addCase(fetchMessages.pending, state => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
  },
})

export default messagesSlice.reducer
