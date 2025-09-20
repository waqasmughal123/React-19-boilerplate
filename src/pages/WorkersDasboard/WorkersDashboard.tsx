

import React, { useEffect } from 'react'
import { MainLayout } from '@/components'
import Workers from '@/components/organisms/Worker/Worker'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store'
import { fetchWorkers, createWorker, updateWorker, deleteWorker } from '@/store/slices/workerSlice'
import { Worker } from '@/services/workersService'

import { useSnackbar } from 'notistack'

const WorkersDashboard = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { enqueueSnackbar } = useSnackbar() // ✅ Add this

  const { items, loading, error } = useSelector((state: RootState) => state.workers)

  const handleAdd = async (data: Partial<Worker>) => {
    try {
      const resultAction = await dispatch(createWorker(data))
      if (createWorker.fulfilled.match(resultAction)) {
        enqueueSnackbar('Worker added successfully!', { variant: 'success' })
        // 👇 Refresh workers list with complete data
        dispatch(fetchWorkers({}))
      } else {
        const message =
          resultAction.payload?.email?.[0] ||
          resultAction.error?.message ||
          'Failed to add worker'
        enqueueSnackbar(message, { variant: 'error' })
      }
    } catch (err) {
      enqueueSnackbar('Something went wrong!', { variant: 'error' })
    }
  }

  const handleUpdate = async (id: number, data: Partial<Worker>) => {
    try {
      const resultAction = await dispatch(updateWorker({ id, data }))
      if (updateWorker.fulfilled.match(resultAction)) {
        enqueueSnackbar('Worker updated successfully!', { variant: 'success' })
        // 👇 Refresh workers list with complete data
        dispatch(fetchWorkers({}))
      } else {
        const message =
          resultAction.payload?.email?.[0] ||
          resultAction.error?.message ||
          'Failed to update worker'
        enqueueSnackbar(message, { variant: 'error' })
      }
    } catch (err) {
      enqueueSnackbar('Something went wrong!', { variant: 'error' })
    }
  }


  const handleDelete = async (id: number) => {
    try {
      const resultAction = await dispatch(deleteWorker(id))
      if (deleteWorker.fulfilled.match(resultAction)) {
        enqueueSnackbar('Worker deleted successfully!', { variant: 'success' })
      } else {
        enqueueSnackbar('Failed to delete worker', { variant: 'error' })
      }
    } catch (err) {
      enqueueSnackbar('Something went wrong!', { variant: 'error' })
    }
  }

  useEffect(() => {
    dispatch(fetchWorkers({}))
  }, [dispatch])

  return (
    <MainLayout>
      <Workers
        workers={items}
        loading={{ workers: loading }}
        error={{
          workers: error ? (typeof error === 'string' ? error : JSON.stringify(error)) : null
        }}
        onAdd={handleAdd}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    </MainLayout>
  )
}

export default WorkersDashboard
