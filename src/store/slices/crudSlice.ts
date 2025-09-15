import { createSlice, createAsyncThunk as reduxCreateAsyncThunk, PayloadAction, Draft } from '@reduxjs/toolkit'
import { 
  BaseEntity, 
  CrudState, 
  CrudParams,
  Message,
  ErrorResponse 
} from '../../types/crud'
import { CrudService } from '../../services/crudService'
import { getCrudKey } from '../../constants/crudKeys'

// Generic error handler
const handleAsyncError = (error: unknown, defaultMessage: string, key: string) => {
  const errorMessage = error instanceof Error ? error.message : defaultMessage
  return {
    message: errorMessage,
    key
  }
}



// Generic async thunk creator for CRUD operations
export function createCrudAsyncThunks<T extends BaseEntity>(
  entityName: string,
  service: CrudService<T>
) {
  const list = reduxCreateAsyncThunk(
    `${entityName}/list`,
    async (params: CrudParams & { key?: string }, { rejectWithValue }) => {
      const key = getCrudKey(params.key)
      try {
        const response = await service.list(params)
        return { ...response, key }
      } catch (error: unknown) {
        return rejectWithValue(handleAsyncError(error, 'Failed to fetch items', key))
      }
    }
  )

  const get = reduxCreateAsyncThunk(
    `${entityName}/get`,
    async (params: { id: number | string; key?: string }, { rejectWithValue }) => {
      const key = getCrudKey(params.key)
      try {
        const response = await service.get(params.id)
        return { data: response, key }
      } catch (error: unknown) {
        return rejectWithValue(handleAsyncError(error, 'Failed to fetch item', key))
      }
    }
  )

  const create = reduxCreateAsyncThunk(
    `${entityName}/create`,
    async (params: { data: Partial<T>; key?: string }, { rejectWithValue }) => {
      const key = getCrudKey(params.key)
      try {
        const response = await service.create(params.data)
        return { data: response, key }
      } catch (error: unknown) {
        return rejectWithValue(handleAsyncError(error, 'Failed to create item', key))
      }
    }
  )

  const update = reduxCreateAsyncThunk(
    `${entityName}/update`,
    async (params: { id: number | string; data: Partial<T>; key?: string }, { rejectWithValue }) => {
      const key = getCrudKey(params.key)
      try {
        const response = await service.update(params.id, params.data)
        return { data: response, key }
      } catch (error: unknown) {
        return rejectWithValue(handleAsyncError(error, 'Failed to update item', key))
      }
    }
  )

  const patch = reduxCreateAsyncThunk(
    `${entityName}/patch`,
    async (params: { id: number | string; data: Partial<T>; key?: string }, { rejectWithValue }) => {
      const key = getCrudKey(params.key)
      try {
        const response = await service.patch(params.id, params.data)
        return { data: response, key }
      } catch (error: unknown) {
        return rejectWithValue(handleAsyncError(error, 'Failed to patch item', key))
      }
    }
  )

  const remove = reduxCreateAsyncThunk(
    `${entityName}/delete`,
    async (params: { id: number | string; key?: string }, { rejectWithValue }) => {
      const key = getCrudKey(params.key)
      try {
        await service.delete(params.id)
        return { id: params.id, key }
      } catch (error: unknown) {
        return rejectWithValue(handleAsyncError(error, 'Failed to delete item', key))
      }
    }
  )

  const bulkDelete = reduxCreateAsyncThunk(
    `${entityName}/bulkDelete`,
    async (params: { ids: (number | string)[]; key?: string }, { rejectWithValue }) => {
      const key = getCrudKey(params.key)
      try {
        await service.bulkDelete(params.ids)
        return { ids: params.ids, key }
      } catch (error: unknown) {
        return rejectWithValue(handleAsyncError(error, 'Failed to delete items', key))
      }
    }
  )

  return { list, get, create, update, patch, remove, bulkDelete }
}

// Generic CRUD slice creator
export function createCrudSlice<T extends BaseEntity>(
  name: string,
  service: CrudService<T>
) {
  const asyncThunks = createCrudAsyncThunks<T>(name, service)

  const initialState: CrudState<T> = {
    items: [],
    currentItem: null,
    loading: {},
    errors: {},
    success: {},
    pagination: {
      count: 0,
      next: null,
      previous: null,
      page_size: 10,
      current_page: 1,
      total_pages: 0
    },
    filters: {},
    searchQuery: '',
    sortBy: 'id',
    sortOrder: 'desc'
  }

  const slice = createSlice({
    name,
    initialState,
    reducers: {
      // Clear loading state
      clearLoading: (state, action: PayloadAction<string>) => {
        const key = action.payload
        delete state.loading[key]
      },

      // Clear error state
      clearError: (state, action: PayloadAction<string>) => {
        const key = action.payload
        delete state.errors[key]
      },

      // Clear success state
      clearSuccess: (state, action: PayloadAction<string>) => {
        const key = action.payload
        delete state.success[key]
      },

      // Clear all states for a key
      clearStates: (state, action: PayloadAction<string>) => {
        const key = action.payload
        delete state.loading[key]
        delete state.errors[key]
        delete state.success[key]
      },

      // Set current item
      setCurrentItem: (state, action: PayloadAction<T | null>) => {
        state.currentItem = action.payload as Draft<T> | null
      },

      // Set filters
      setFilters: (state, action: PayloadAction<Record<string, unknown>>) => {
        state.filters = action.payload
      },

      // Set search query
      setSearchQuery: (state, action: PayloadAction<string>) => {
        state.searchQuery = action.payload
      },

      // Set sorting
      setSorting: (state, action: PayloadAction<{ sortBy: string; sortOrder: 'asc' | 'desc' }>) => {
        state.sortBy = action.payload.sortBy
        state.sortOrder = action.payload.sortOrder
      },

      // Reset state
      resetState: () => initialState,

      // Update item in list (for optimistic updates)
      updateItemInList: (state, action: PayloadAction<T>) => {
        const index = state.items.findIndex((item) => item.id === action.payload.id)
        if (index !== -1) {
          state.items[index] = action.payload as Draft<T>
        }
      },

      // Remove item from list (for optimistic updates)
      removeItemFromList: (state, action: PayloadAction<number | string>) => {
        state.items = state.items.filter((item) => item.id !== action.payload)
      },

      // Add item to list (for optimistic updates)
      addItemToList: (state, action: PayloadAction<T>) => {
        state.items.unshift(action.payload as Draft<T>)
      }
    },
    extraReducers: (builder) => {
      // Generic handlers for common patterns
      const createPendingHandler = () => (state: Draft<CrudState<T>>, action: { meta: { arg: { key?: string } } }) => {
        const actionKey = getCrudKey(action.meta.arg.key)
        state.loading[actionKey] = true
        delete state.errors[actionKey]
      }

      const createRejectedHandler = (defaultMessage: string) => (state: Draft<CrudState<T>>, action: { payload: unknown }) => {
        const payload = action.payload as ErrorResponse
        const key = getCrudKey(payload?.key)
        state.loading[key] = false
        state.errors[key] = payload?.message || defaultMessage
      }

      // List operations
      builder
        .addCase(asyncThunks.list.pending, createPendingHandler())
        .addCase(asyncThunks.list.fulfilled, (state, action) => {
          const key = action.payload.key
          state.loading[key] = false
          state.items = action.payload.data as Draft<T>[]
          state.pagination = {
            count: action.payload.count,
            next: action.payload.next,
            previous: action.payload.previous,
            page_size: action.payload.page_size || 10,
            current_page: action.payload.current_page || 1,
            total_pages: action.payload.total_pages || Math.ceil(action.payload.count / (action.payload.page_size || 10))
          }
          state.success[key] = 'Items loaded successfully'
        })
        .addCase(asyncThunks.list.rejected, createRejectedHandler('Failed to load items'))

      // Get single item
      builder
        .addCase(asyncThunks.get.pending, createPendingHandler())
        .addCase(asyncThunks.get.fulfilled, (state, action) => {
          const key = action.payload.key
          state.loading[key] = false
          state.currentItem = action.payload.data as Draft<T>
          state.success[key] = 'Item loaded successfully'
        })
        .addCase(asyncThunks.get.rejected, createRejectedHandler('Failed to load item'))

      // Create item
      builder
        .addCase(asyncThunks.create.pending, createPendingHandler())
        .addCase(asyncThunks.create.fulfilled, (state, action) => {
          const key = action.payload.key
          state.loading[key] = false
          state.items.unshift(action.payload.data as Draft<T>)
          state.currentItem = action.payload.data as Draft<T>
          state.success[key] = 'Item created successfully'
        })
        .addCase(asyncThunks.create.rejected, createRejectedHandler('Failed to create item'))

      // Update item
      builder
        .addCase(asyncThunks.update.pending, createPendingHandler())
        .addCase(asyncThunks.update.fulfilled, (state, action) => {
          const key = action.payload.key
          state.loading[key] = false
          const index = state.items.findIndex((item) => item.id === action.payload.data.id)
          if (index !== -1) {
            state.items[index] = action.payload.data as Draft<T>
          }
          if (state.currentItem?.id === action.payload.data.id) {
            state.currentItem = action.payload.data as Draft<T>
          }
          state.success[key] = 'Item updated successfully'
        })
        .addCase(asyncThunks.update.rejected, createRejectedHandler('Failed to update item'))

      // Patch item
      builder
        .addCase(asyncThunks.patch.pending, createPendingHandler())
        .addCase(asyncThunks.patch.fulfilled, (state, action) => {
          const key = action.payload.key
          state.loading[key] = false
          const index = state.items.findIndex((item) => item.id === action.payload.data.id)
          if (index !== -1) {
            state.items[index] = action.payload.data as Draft<T>
          }
          if (state.currentItem?.id === action.payload.data.id) {
            state.currentItem = action.payload.data as Draft<T>
          }
          state.success[key] = 'Item updated successfully'
        })
        .addCase(asyncThunks.patch.rejected, createRejectedHandler('Failed to update item'))

      // Delete item
      builder
        .addCase(asyncThunks.remove.pending, createPendingHandler())
        .addCase(asyncThunks.remove.fulfilled, (state, action) => {
          const key = action.payload.key
          state.loading[key] = false
          state.items = state.items.filter((item) => item.id !== action.payload.id)
          if (state.currentItem?.id === action.payload.id) {
            state.currentItem = null
          }
          state.success[key] = 'Item deleted successfully'
        })
        .addCase(asyncThunks.remove.rejected, createRejectedHandler('Failed to delete item'))

      // Bulk delete
      builder
        .addCase(asyncThunks.bulkDelete.pending, createPendingHandler())
        .addCase(asyncThunks.bulkDelete.fulfilled, (state, action) => {
          const key = action.payload.key
          state.loading[key] = false
          state.items = state.items.filter((item) => !action.payload.ids.includes(item.id))
          state.success[key] = `${action.payload.ids.length} items deleted successfully`
        })
        .addCase(asyncThunks.bulkDelete.rejected, createRejectedHandler('Failed to delete items'))
    }
  })

  return {
    slice,
    actions: { ...slice.actions, ...asyncThunks },
    reducer: slice.reducer
  }
}

// Message slice for global notifications
interface MessageState {
  messages: Message[]
}

const initialMessageState: MessageState = {
  messages: []
}

export const messageSlice = createSlice({
  name: 'messages',
  initialState: initialMessageState,
  reducers: {
    addMessage: (state, action: PayloadAction<Omit<Message, 'id'>>) => {
      const message: Message = {
        ...action.payload,
        id: Date.now().toString() + Math.random().toString(36).substring(2, 11)
      }
      state.messages.push(message)
    },
    removeMessage: (state, action: PayloadAction<string>) => {
      state.messages = state.messages.filter((message: Message) => message.id !== action.payload)
    },
    clearMessages: (state) => {
      state.messages = []
    }
  }
})

export const { addMessage, removeMessage, clearMessages } = messageSlice.actions
