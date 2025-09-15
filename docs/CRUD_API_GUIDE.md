# CRUD API Integration Guide

This guide explains how to use the generic CRUD system for API integration with key-based state management.

## Table of Contents

- [Overview](#overview)
- [API Structure](#api-structure)
- [Key-Based State Management](#key-based-state-management)
- [Usage Examples](#usage-examples)
- [Available CRUD Keys](#available-crud-keys)
- [Error Handling](#error-handling)
- [Best Practices](#best-practices)

## Overview

The CRUD system provides a generic, reusable solution for managing API calls with:
- **Key-based differentiation** for multiple simultaneous operations
- **Centralized state management** using Redux Toolkit
- **Type-safe** TypeScript implementation
- **Consistent error handling** across all operations

## API Structure

### Base Entity Interface

All entities must extend the `BaseEntity` interface:

```typescript
interface BaseEntity {
  id: number | string
  created_at?: string
  updated_at?: string
}
```

### Example Entity

```typescript
interface TestEntity extends BaseEntity {
  id: number
  name: string
  email: string
  status: 'active' | 'inactive'
  description?: string
  category: string
  created_at: string
  updated_at: string
}
```

### API Endpoints Structure

The system expects Django REST Framework style endpoints:

```
GET    /api/entities/           # List entities (with pagination)
POST   /api/entities/           # Create entity
GET    /api/entities/{id}/      # Get single entity
PUT    /api/entities/{id}/      # Update entity (full)
PATCH  /api/entities/{id}/      # Update entity (partial)
DELETE /api/entities/{id}/      # Delete entity
POST   /api/entities/bulk-delete/ # Bulk delete entities
```

### Pagination Response Format

```typescript
interface PaginatedResponse<T> {
  count: number
  next?: string | null
  previous?: string | null
  page_size?: number
  current_page?: number
  total_pages?: number
  data: T[]  // Note: 'results' in Django, but mapped to 'data'
}
```

## Key-Based State Management

### Available Keys

Import from `src/constants/crudKeys.ts`:

```typescript
import { CRUD_KEYS } from '../constants/crudKeys'

// Available keys:
CRUD_KEYS.DEFAULT       // 'default'
CRUD_KEYS.MAIN_LIST     // 'main-list'
CRUD_KEYS.SIDEBAR_LIST  // 'sidebar-list'
CRUD_KEYS.MODAL_LIST    // 'modal-list'
CRUD_KEYS.WIDGET_LIST   // 'widget-list'
CRUD_KEYS.CREATE        // 'create'
CRUD_KEYS.UPDATE        // 'update'
CRUD_KEYS.DELETE        // 'delete'
CRUD_KEYS.BULK_DELETE   // 'bulk-delete'
CRUD_KEYS.GET           // 'get'
CRUD_KEYS.CLONE         // 'clone'
CRUD_KEYS.ERROR_TEST    // 'error-test'
CRUD_KEYS.REFRESH       // 'refresh'
```

### State Structure

Each key maintains independent loading, error, and success states:

```typescript
interface CrudState<T> {
  items: T[]
  currentItem: T | null
  loading: Record<string, boolean>    // Key-based loading
  errors: Record<string, string | null>  // Key-based errors  
  success: Record<string, string | null> // Key-based success
  pagination: PaginationState
  filters: Record<string, unknown>
  searchQuery: string
  sortBy: string
  sortOrder: 'asc' | 'desc'
}
```

## Usage Examples

### 1. Setting Up a New Entity

#### Step 1: Define Your Entity Type

```typescript
// src/types/myEntity.ts
import { BaseEntity } from './crud'

export interface MyEntity extends BaseEntity {
  id: number
  name: string
  email: string
  status: 'active' | 'inactive'
  created_at: string
  updated_at: string
}
```

#### Step 2: Create Service Instance

```typescript
// src/services/myEntityService.ts
import { createCrudService } from './crudService'
import type { MyEntity } from '../types/myEntity'

export const myEntityService = createCrudService<MyEntity>('/api/my-entities/')
```

#### Step 3: Create Redux Store Slice

```typescript
// src/store/myEntityStore.ts
import { createCrudSlice } from './slices/crudSlice'
import { myEntityService } from '../services/myEntityService'
import type { MyEntity } from '../types/myEntity'

const myEntitySlice = createCrudSlice<MyEntity>('myEntity', myEntityService)
export const myEntityActions = myEntitySlice.actions
export const myEntityReducer = myEntitySlice.reducer
```

#### Step 4: Add to Store Configuration

```typescript
// src/store/index.ts
import { myEntityReducer } from './myEntityStore'

export const store = configureStore({
  reducer: {
    // ... other reducers
    myEntity: myEntityReducer,
  },
})
```

### 2. Using in Components

#### Basic Usage with Single Selector

```typescript
import React from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../hooks'
import { myEntityActions } from '../store/myEntityStore'
import { CRUD_KEYS } from '../constants/crudKeys'

const MyEntityList: React.FC = () => {
  const dispatch = useAppDispatch()
  
  // Single selector with destructuring
  const {
    items = [],
    currentItem = null,
    loading: {
      [CRUD_KEYS.MAIN_LIST]: mainListLoading = false,
      [CRUD_KEYS.CREATE]: createLoading = false,
    } = {},
    errors: {
      [CRUD_KEYS.MAIN_LIST]: mainListError = null,
      [CRUD_KEYS.CREATE]: createError = null,
    } = {},
  } = useSelector((state: RootState) => state.myEntity || {})

  // Load data
  const loadData = () => {
    dispatch(myEntityActions.list({
      key: CRUD_KEYS.MAIN_LIST,
      page: 1,
      page_size: 10,
      ordering: '-created_at'
    }))
  }

  // Create new entity
  const createEntity = (data: Partial<MyEntity>) => {
    dispatch(myEntityActions.create({
      data,
      key: CRUD_KEYS.CREATE
    }))
  }

  return (
    <div>
      {mainListLoading && <div>Loading...</div>}
      {mainListError && <div>Error: {mainListError}</div>}
      
      {items.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
      
      <button onClick={loadData}>Refresh</button>
    </div>
  )
}
```

### 3. Multiple Independent API Calls

```typescript
const MyComplexComponent: React.FC = () => {
  const dispatch = useAppDispatch()
  
  const {
    items = [],
    loading: {
      [CRUD_KEYS.MAIN_LIST]: mainLoading = false,
      [CRUD_KEYS.SIDEBAR_LIST]: sidebarLoading = false,
      [CRUD_KEYS.MODAL_LIST]: modalLoading = false,
    } = {},
  } = useSelector((state: RootState) => state.myEntity || {})

  // Load different data sets simultaneously
  const loadAllData = () => {
    // Main table - paginated with filters
    dispatch(myEntityActions.list({
      key: CRUD_KEYS.MAIN_LIST,
      page: 1,
      page_size: 20,
      search: 'active users',
      filters: { status: 'active' }
    }))

    // Sidebar - recent items
    dispatch(myEntityActions.list({
      key: CRUD_KEYS.SIDEBAR_LIST,
      page: 1,
      page_size: 5,
      ordering: '-created_at'
    }))

    // Modal - specific category
    dispatch(myEntityActions.list({
      key: CRUD_KEYS.MODAL_LIST,
      page: 1,
      page_size: 10,
      filters: { category: 'important' }
    }))
  }

  return (
    <div>
      <main>
        {mainLoading ? 'Loading main...' : 'Main content'}
      </main>
      
      <aside>
        {sidebarLoading ? 'Loading sidebar...' : 'Sidebar content'}
      </aside>
      
      {/* Each section has independent loading states */}
    </div>
  )
}
```

### 4. CRUD Operations

```typescript
const MyCrudComponent: React.FC = () => {
  const dispatch = useAppDispatch()
  
  // Create
  const handleCreate = (data: Partial<MyEntity>) => {
    dispatch(myEntityActions.create({
      data,
      key: CRUD_KEYS.CREATE
    }))
  }

  // Update
  const handleUpdate = (id: number, data: Partial<MyEntity>) => {
    dispatch(myEntityActions.update({
      id,
      data,
      key: CRUD_KEYS.UPDATE
    }))
  }

  // Partial update
  const handlePatch = (id: number, data: Partial<MyEntity>) => {
    dispatch(myEntityActions.patch({
      id,
      data,
      key: CRUD_KEYS.UPDATE // Can use same key or different
    }))
  }

  // Delete single
  const handleDelete = (id: number) => {
    dispatch(myEntityActions.remove({
      id,
      key: CRUD_KEYS.DELETE
    }))
  }

  // Bulk delete
  const handleBulkDelete = (ids: number[]) => {
    dispatch(myEntityActions.bulkDelete({
      ids,
      key: CRUD_KEYS.BULK_DELETE
    }))
  }

  // Get single item
  const handleGet = (id: number) => {
    dispatch(myEntityActions.get({
      id,
      key: CRUD_KEYS.GET
    }))
  }

  return <div>{/* Your UI */}</div>
}
```

## Available CRUD Keys

### List Operations
- `CRUD_KEYS.MAIN_LIST` - Main table/list view
- `CRUD_KEYS.SIDEBAR_LIST` - Sidebar or secondary list
- `CRUD_KEYS.MODAL_LIST` - Modal or popup list
- `CRUD_KEYS.WIDGET_LIST` - Widget or dashboard list

### CRUD Operations
- `CRUD_KEYS.CREATE` - Create operations
- `CRUD_KEYS.UPDATE` - Update operations  
- `CRUD_KEYS.PATCH` - Partial update operations
- `CRUD_KEYS.DELETE` - Delete operations
- `CRUD_KEYS.BULK_DELETE` - Bulk delete operations
- `CRUD_KEYS.GET` - Get single item operations

### Special Operations
- `CRUD_KEYS.CLONE` - Clone/duplicate operations
- `CRUD_KEYS.REFRESH` - Refresh operations
- `CRUD_KEYS.ERROR_TEST` - Testing error scenarios
- `CRUD_KEYS.DEFAULT` - Default fallback key

## Error Handling

### Error Response Format

```typescript
interface ErrorResponse {
  message: string
  key?: string
}
```

### Accessing Errors

```typescript
const {
  errors: {
    [CRUD_KEYS.MAIN_LIST]: listError = null,
    [CRUD_KEYS.CREATE]: createError = null,
  } = {}
} = useSelector((state: RootState) => state.myEntity || {})

// Display errors
{listError && <Alert severity="error">{listError}</Alert>}
{createError && <Alert severity="error">{createError}</Alert>}
```

### Manual Error Clearing

```typescript
// Clear specific error
dispatch(myEntityActions.clearError(CRUD_KEYS.MAIN_LIST))

// Clear all states for a key
dispatch(myEntityActions.clearStates(CRUD_KEYS.MAIN_LIST))
```

## Best Practices

### 1. Use Meaningful Keys

```typescript
// Good
dispatch(actions.list({ key: CRUD_KEYS.MAIN_LIST }))
dispatch(actions.list({ key: CRUD_KEYS.SIDEBAR_LIST }))

// Avoid
dispatch(actions.list({ key: 'list1' }))
dispatch(actions.list({ key: 'list2' }))
```

### 2. Group Related Operations

```typescript
// Use same key for related operations
const handleSaveAndRefresh = (data: Partial<MyEntity>) => {
  dispatch(actions.create({ data, key: CRUD_KEYS.CREATE }))
  // After success, refresh the main list
  dispatch(actions.list({ key: CRUD_KEYS.MAIN_LIST }))
}
```

### 3. Handle Loading States Appropriately

```typescript
// Show loading for each independent operation
{mainListLoading && <TableSkeleton />}
{sidebarLoading && <SidebarSkeleton />}
{createLoading && <ButtonSpinner />}
```

### 4. Clean Up States When Needed

```typescript
useEffect(() => {
  return () => {
    // Clean up on unmount
    dispatch(actions.clearStates(CRUD_KEYS.MAIN_LIST))
  }
}, [])
```

### 5. Use TypeScript for Type Safety

```typescript
// Always type your entities
interface MyEntity extends BaseEntity {
  // ... your fields
}

// Use typed service
const service = createCrudService<MyEntity>('/api/my-entities/')
```

## Advanced Usage

### Custom Service Configuration

```typescript
// Custom endpoints
const customService = createCrudService<MyEntity>('/api/my-entities/', {
  list: '',           // GET /api/my-entities/
  create: '',         // POST /api/my-entities/
  read: ':id/',       // GET /api/my-entities/{id}/
  update: ':id/',     // PUT /api/my-entities/{id}/
  patch: ':id/',      // PATCH /api/my-entities/{id}/
  delete: ':id/',     // DELETE /api/my-entities/{id}/
  bulkDelete: 'bulk-delete/' // POST /api/my-entities/bulk-delete/
})
```

### Optimistic Updates

```typescript
// Update UI immediately, then sync with server
dispatch(actions.updateItemInList(updatedItem))
dispatch(actions.update({ id, data, key: CRUD_KEYS.UPDATE }))
```

This guide covers the essential patterns for using the CRUD API system effectively. The key-based approach allows for flexible, scalable state management across complex applications.
