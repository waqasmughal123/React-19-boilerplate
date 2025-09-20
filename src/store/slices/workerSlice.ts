import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { workersService, Worker } from '../../services/workersService'

// Async thunk
export const fetchWorkers = createAsyncThunk(
  'workers/fetch',
  async (params: { search?: string; page?: number; page_size?: number } = {}, { rejectWithValue }) => {
    try {
      const res = await workersService.list({
        search: params.search,
        page: params.page,
        page_size: params.page_size
      })
      return res
    } catch (err: any) {
      return rejectWithValue(err.response?.data || 'Failed to fetch workers')
    }
  }
)

// ✅ Add Worker
export const createWorker = createAsyncThunk(
  'workers/create',
  async (data: Partial<Worker>, { rejectWithValue }) => {
    try {
      const response = await workersService.create(data)
      return response
    } catch (err: any) {
      return rejectWithValue(err.response?.data || 'Failed to create worker')
    }
  }
)

// ✅ Update Worker
export const updateWorker = createAsyncThunk(
  'workers/update',
  async ({ id, data }: { id: number; data: Partial<Worker> }, { rejectWithValue }) => {
    try {
      const response = await workersService.update(id, data)
      return response
    } catch (err: any) {
      return rejectWithValue(err.response?.data || 'Failed to update worker')
    }
  }
)

// ✅ Delete Worker
export const deleteWorker = createAsyncThunk(
  'workers/delete',
  async (id: number, { rejectWithValue }) => {
    try {
      await workersService.delete(id)
      return id
    } catch (err: any) {
      return rejectWithValue(err.response?.data || 'Failed to delete worker')
    }
  }
)

interface WorkersState {
  items: Worker[]
  loading: boolean
  error: string | null
  count: number
  page_size: number
  current_page: number
  total_pages: number
}

const initialState: WorkersState = {
  items: [],
  loading: false,
  error: null,
  count: 0,
  page_size: 10,
  current_page: 1,
  total_pages: 0
}

const workerSlice = createSlice({
  name: 'workers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchWorkers.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchWorkers.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false
        state.items = action.payload.data
        state.count = action.payload.count
        state.page_size = action.payload.page_size
        state.current_page = action.payload.current_page
        state.total_pages = action.payload.total_pages
      })
      .addCase(fetchWorkers.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string || 'Failed to fetch workers'
      })

      // Create (Optimistic + Loader)
      .addCase(createWorker.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createWorker.fulfilled, (state, action: PayloadAction<Worker>) => {
        state.loading = false
        state.items.push(action.payload) // immediate add to UI
      })
      .addCase(createWorker.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string || 'Failed to create worker'
      })

      // Update (Optimistic + Loader)
      .addCase(updateWorker.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateWorker.fulfilled, (state, action: PayloadAction<Worker>) => {
        state.loading = false
        const index = state.items.findIndex((w) => w.id === action.payload.id)
        if (index !== -1) {
          state.items[index] = action.payload // immediate update in UI
        }
      })
      .addCase(updateWorker.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string || 'Failed to update worker'
      })

      // Delete
      .addCase(deleteWorker.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteWorker.fulfilled, (state, action: PayloadAction<number>) => {
        state.loading = false
        state.items = state.items.filter((w) => w.id !== action.payload)
      })
      .addCase(deleteWorker.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string || 'Failed to delete worker'
      })
  }
})

export const workersReducer = workerSlice.reducer
