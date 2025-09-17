import React from 'react'
import WorkersTable from '../../atoms/WorkerTable/WorkerTable'

interface Worker {
  id: number
  name: string
  email: string
  phone: string
  status: 'ACTIVE' | 'INACTIVE'
  skills: string
  hireDate: string
  active: boolean
  address?: string
  shifts?: string
}

interface WorkerMoleculesProps {
  workers: Worker[]
  onEdit: (worker: Worker) => void
  onDelete: (id: number) => void
  onToggleActive: (id: number) => void
}

const WorkerMolecules: React.FC<WorkerMoleculesProps> = ({
  workers,
  onEdit,
  onDelete,
  onToggleActive
}) => {
  return (
    <div>
      <WorkersTable
        workers={workers}
        onEdit={onEdit}
        onDelete={onDelete}
        onToggleActive={onToggleActive}
      />
    </div>
  )
}

export default WorkerMolecules
