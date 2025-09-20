import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import { messageSlice, createCrudSlice } from './slices/crudSlice'
import { workersReducer } from './slices/workerSlice'
import { testEntityService } from '../services/crudService'
import type { TestEntity } from '../types/crud'

// Test entity slice
const testEntitySlice = createCrudSlice<TestEntity>('testEntity', testEntityService)

export const store = configureStore({
  reducer: {
    auth: authReducer,
    messages: messageSlice.reducer,
    testEntity: testEntitySlice.reducer,
    workers: workersReducer, // ✅ correct
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

export const testEntityActions = testEntitySlice.actions
