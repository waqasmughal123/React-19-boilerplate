import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import { messageSlice, createCrudSlice } from './slices/crudSlice'
import { testEntityService } from '../services/crudService'
import type { TestEntity } from '../types/crud'

// Create test entity slice
const testEntitySlice = createCrudSlice<TestEntity>('testEntity', testEntityService)

export const store = configureStore({
  reducer: {
    auth: authReducer,
    messages: messageSlice.reducer,
    testEntity: testEntitySlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// Export test entity actions for use in components
export const testEntityActions = testEntitySlice.actions
