import React from 'react'
import WorkersTable from '../../atoms/WorkerTable/WorkerTable'

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
interface WorkerMoleculesProps {
  workers: Worker[]
  onEdit?: (worker: Worker) => void
  onDelete?: (id: number) => void
  onToggleActive?: (id: number) => void
}

const WorkerMolecules: React.FC<WorkerMoleculesProps> = ({
  workers,
  onEdit,
  onDelete,
  onToggleActive
}) => {
  const handleEdit = (worker: Worker) => onEdit?.(worker)
  const handleDelete = (id: number) => onDelete?.(id)
  const handleToggleActive = (id: number) => onToggleActive?.(id)

  return (
    <div>
      <WorkersTable
        workers={workers}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onToggleActive={handleToggleActive}
      />
    </div>
  )
}

export default WorkerMolecules
