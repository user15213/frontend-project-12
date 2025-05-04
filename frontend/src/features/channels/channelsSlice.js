import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../api/axios'

export const fetchChannels = createAsyncThunk(
  'channels/fetchChannels',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/api/v1/channels')
      return data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message)
    }
  }
)

const channelsSlice = createSlice({
  name: 'channels',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {

  },
  extraReducers: builder => {
    builder
      .addCase(fetchChannels.pending, state => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchChannels.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(fetchChannels.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
  },
})

export default channelsSlice.reducer
