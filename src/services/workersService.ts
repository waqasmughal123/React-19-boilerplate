import axios from 'axios'
import { enqueueSnackbar } from 'notistack'

// ✅ Worker interface
export interface Worker {
  id?: number
  name: string
  email: string
  phone: string
  status: string
  skills: string[]   // array bhejna hai backend ko
  hireDate: string
  active: boolean
  address: string
  shifts: string
}

// ✅ Helper: convert backend error into readable string
function formatError(error: any): string {
  if (error.response && error.response.data) {
    const errData = error.response.data
    if (typeof errData === 'object') {
      // { email: ["This email already exists."] } → "This email already exists."
      return Object.values(errData).flat().join(', ')
    }
    return String(errData)
  }
  return error.message || 'Something went wrong'
}

// ✅ Worker API service
export class WorkersService {
  private baseUrl = "http://54.206.231.112:8000/api/workers/"

  // Generic GET with token
  private async get<T>(url: string): Promise<T> {
    try {
      const token = localStorage.getItem('token')
      const res = await axios.get<T>(url, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined
      })
      return res.data
    } catch (error: any) {
      enqueueSnackbar(formatError(error), { variant: 'error' })
      throw error
    }
  }

  // ✅ POST - create worker
 // ✅ POST - create worker
async create(data: Partial<Worker>): Promise<Worker> {
  try {
    const token = localStorage.getItem('token')

    // 👇 ensure email provided
    if (!data.email) {
      throw new Error("Email is required")
    }

    const res = await axios.post(this.baseUrl, data, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    })
    enqueueSnackbar('Worker created successfully!', { variant: 'success' })
    return res.data
  } catch (error: any) {
    enqueueSnackbar(formatError(error), { variant: 'error' })
    throw error
  }
}

  // ✅ PATCH - update worker
 // ✅ PATCH - update worker
async update(id: number, data: Partial<Worker>): Promise<Worker> {
  try {
    const token = localStorage.getItem('token')

    // 👇 agar email blank hai to hata do payload se
    if (!data.email) {
      delete data.email
    }

    const res = await axios.patch(`${this.baseUrl}${id}/`, data, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    })
    enqueueSnackbar('Worker updated successfully!', { variant: 'success' })
    return res.data
  } catch (error: any) {
    enqueueSnackbar(formatError(error), { variant: 'error' })
    throw error
  }
}

  // ✅ DELETE - remove worker
  async delete(id: number): Promise<void> {
    try {
      const token = localStorage.getItem('token')
      await axios.delete(`${this.baseUrl}${id}/`, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      })
      enqueueSnackbar('Worker deleted successfully!', { variant: 'success' })
    } catch (error: any) {
      enqueueSnackbar(formatError(error), { variant: 'error' })
      throw error
    }
  }

  // ✅ List workers
  async list(params?: { search?: string; page?: number; page_size?: number }) {
    try {
      const query = new URLSearchParams()

      if (params?.page) query.append('page', params.page.toString())
      if (params?.page_size) query.append('page_size', params.page_size.toString())
      if (params?.search) query.append('search', params.search)

      const url = `${this.baseUrl}?${query.toString()}`
      console.log('Fetching URL:', url)

      const response = await this.get<any>(url)
      console.log('API Response:', response)

      const mappedWorkers: Worker[] = response.results.map((w: any) => {
        const fullName = (w.full_name && w.full_name.trim()) || ''
        const firstLast = `${w.first_name?.trim() || ''} ${w.last_name?.trim() || ''}`.trim()
        const name = fullName || firstLast || 'N/A'

        console.log('Mapped worker:', w.id, name)

        return {
          id: w.id,
          name,
          email: w.email || 'N/A',
          phone: w.phone || 'N/A',
          status: w.is_active ? 'ACTIVE' : 'INACTIVE',
          skills: w.skills || [],
          hireDate: w.date_joined || '',
          active: w.is_active ?? false,
          address: w.address || '',
          shifts: w.shifts || ''
        }
      })

      return {
        data: mappedWorkers,
        count: response.count,
        next: response.next,
        previous: response.previous,
        page_size: response.page_size || 10,
        current_page: response.current_page || 1,
        total_pages: Math.ceil(response.count / (response.page_size || 10))
      }
    } catch (error: any) {
      enqueueSnackbar(formatError(error), { variant: 'error' })
      throw error
    }
  }
}

// ✅ Export singleton instance
export const workersService = new WorkersService()
