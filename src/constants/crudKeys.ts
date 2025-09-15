// CRUD operation keys for state management
export const CRUD_KEYS = {
  // Default key
  DEFAULT: 'default',
  
  // List operations
  MAIN_LIST: 'main-list',
  SIDEBAR_LIST: 'sidebar-list',
  MODAL_LIST: 'modal-list',
  WIDGET_LIST: 'widget-list',
  
  // CRUD operations
  CREATE: 'create',
  UPDATE: 'update',
  PATCH: 'patch',
  DELETE: 'delete',
  BULK_DELETE: 'bulk-delete',
  GET: 'get',
  
  // Specific use cases
  CLONE: 'clone',
  ERROR_TEST: 'error-test',
  REFRESH: 'refresh',
} as const

// Type for all available keys
export type CrudKey = typeof CRUD_KEYS[keyof typeof CRUD_KEYS]

// Helper function to get key with fallback
export const getCrudKey = (key?: string): string => {
  return key || CRUD_KEYS.DEFAULT
}
