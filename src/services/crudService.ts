import { apiService } from './api'
import { BaseEntity, PaginatedResponse, CrudParams, CrudServiceConfig, CrudEndpoints } from '../types/crud'

export class CrudService<T extends BaseEntity> {
  private config: CrudServiceConfig

  constructor(config: CrudServiceConfig) {
    this.config = config
  }

  private buildUrl(endpoint: string, id?: number | string): string {
    const url = `${this.config.baseUrl}${endpoint}`
    return id ? `${url}${id}/` : url
  }

  private buildQueryParams(params: CrudParams = {}): string {
    const queryParams = new URLSearchParams()
    
    if (params.page) queryParams.append('page', params.page.toString())
    if (params.page_size) queryParams.append('page_size', params.page_size.toString())
    if (params.search) queryParams.append('search', params.search)
    if (params.ordering) queryParams.append('ordering', params.ordering)
    
    if (params.filters) {
      Object.entries(params.filters).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== '') {
          queryParams.append(key, value.toString())
        }
      })
    }
    
    const queryString = queryParams.toString()
    return queryString ? `?${queryString}` : ''
  }

  async list(params: CrudParams = {}): Promise<PaginatedResponse<T>> {
    const queryParams = this.buildQueryParams({
      ...params,
      page_size: params.page_size || this.config.defaultPageSize || 10
    })
    
    const url = `${this.buildUrl(this.config.endpoints.list)}${queryParams}`
    return apiService.get<PaginatedResponse<T>>(url)
  }

  async get(id: number | string): Promise<T> {
    const url = this.buildUrl(this.config.endpoints.read, id)
    return apiService.get<T>(url)
  }

  async create(data: Partial<T>): Promise<T> {
    const url = this.buildUrl(this.config.endpoints.create)
    return apiService.post<T>(url, data)
  }

  async update(id: number | string, data: Partial<T>): Promise<T> {
    const url = this.buildUrl(this.config.endpoints.update, id)
    return apiService.put<T>(url, data)
  }

  async patch(id: number | string, data: Partial<T>): Promise<T> {
    const url = this.buildUrl(this.config.endpoints.update, id)
    return apiService.patch<T>(url, data)
  }

  async delete(id: number | string): Promise<void> {
    const url = this.buildUrl(this.config.endpoints.delete, id)
    return apiService.delete<void>(url)
  }

  async bulkDelete(ids: (number | string)[]): Promise<void> {
    const url = `${this.buildUrl(this.config.endpoints.delete)}bulk/`
    return apiService.post<void>(url, { ids })
  }
}

export const defaultDjangoEndpoints: CrudEndpoints = {
  list: '',
  create: '',
  read: '',
  update: '',
  delete: '',
}

export function createCrudService<T extends BaseEntity>(
  baseUrl: string,
  endpoints: Partial<CrudEndpoints> = {}
): CrudService<T> {
  const fullEndpoints: CrudEndpoints = {
    list: endpoints.list ?? defaultDjangoEndpoints.list,
    create: endpoints.create ?? defaultDjangoEndpoints.create,
    read: endpoints.read ?? defaultDjangoEndpoints.read,
    update: endpoints.update ?? defaultDjangoEndpoints.update,
    delete: endpoints.delete ?? defaultDjangoEndpoints.delete,
  }
  
  return new CrudService<T>({
    baseUrl: baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`,
    endpoints: fullEndpoints,
    defaultPageSize: 10
  })
}

import type { TestEntity } from '../types/crud'
export const testEntityService = createCrudService<TestEntity>('/api/test-entities/')
