export interface BaseEntity {
  id: number | string
  created_at?: string
  updated_at?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  count: number
  next?: string | null
  previous?: string | null
  page_size?: number
  current_page?: number
  total_pages?: number
}

export interface CrudState<T extends BaseEntity> {
  items: T[]
  currentItem: T | null
  loading: { [key: string]: boolean }
  errors: { [key: string]: string | null }
  success: { [key: string]: string | null }
  pagination: {
    count: number
    next?: string | null
    previous?: string | null
    page_size: number
    current_page: number
    total_pages: number
  }
  filters: Record<string, unknown>
  searchQuery: string
  sortBy: string
  sortOrder: 'asc' | 'desc'
}

export interface CrudParams {
  key?: string
  id?: number | string
  data?: unknown
  filters?: Record<string, unknown>
  page?: number
  page_size?: number
  search?: string
  ordering?: string
}

export interface CrudEndpoints {
  list: string
  create: string
  read: string
  update: string
  delete: string
  [key: string]: string
}

export interface CrudServiceConfig {
  baseUrl: string
  endpoints: CrudEndpoints
  defaultPageSize?: number
}

export interface FormFieldConfig {
  name: string
  label: string
  type: 'text' | 'email' | 'password' | 'number' | 'select' | 'checkbox' | 'textarea' | 'date'
  required?: boolean
  placeholder?: string
  options?: { value: string | number; label: string }[]
  validation?: {
    min?: number
    max?: number
    pattern?: string
    custom?: (value: unknown) => string | null
  }
}

export interface Message {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title?: string
  message: string
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
}

export interface ErrorResponse {
  message: string
  key?: string
}

export interface TestEntity extends BaseEntity {
  id: number
  name: string
  email: string
  description: string
  status: 'active' | 'inactive'
  category: string
  created_at: string
  updated_at: string
}
