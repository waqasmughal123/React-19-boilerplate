import React, { useState } from 'react'
import { Box, Typography, Button, useTheme, useMediaQuery, TextField } from '@mui/material'
import { Add, FilterList } from '@mui/icons-material'
import WorkerModal from '../../molecules/WorkerModal/WorkerModal'
import WorkerMolecules from '../../molecules/WorkerMolecules/WorkerMolecules'

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

const initialWorkers: Worker[] = [
  { id: 1, name: 'Waqas Ali', email: 'waqas@example.com', phone: '+1234567890', status: 'ACTIVE', skills: 'Waterjet', hireDate: '2025-09-02', active: true },
  { id: 2, name: 'Ayesha Khan', email: 'ayesha@example.com', phone: '+1234567891', status: 'ACTIVE', skills: 'Saw cutting', hireDate: '2025-09-02', active: true },
  { id: 3, name: 'Ali Raza', email: 'ali@example.com', phone: '+1234567892', status: 'INACTIVE', skills: 'Welding', hireDate: '2025-09-02', active: false },
  { id: 4, name: 'Sara Ahmed', email: 'sara@example.com', phone: '+1234567893', status: 'ACTIVE', skills: 'Painting', hireDate: '2025-09-02', active: true },
  { id: 5, name: 'Usman Malik', email: 'usman@example.com', phone: '+1234567894', status: 'ACTIVE', skills: 'Assembly', hireDate: '2025-09-02', active: true },
  { id: 6, name: 'Fatima Sheikh', email: 'fatima@example.com', phone: '+1234567895', status: 'INACTIVE', skills: 'Quality Control', hireDate: '2025-09-02', active: false },
  { id: 7, name: 'Bilal Khan', email: 'bilal@example.com', phone: '+1234567896', status: 'ACTIVE', skills: 'Packaging', hireDate: '2025-09-02', active: true },
]

const Workers = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const [workers] = useState<Worker[]>(initialWorkers)
  const [openModal, setOpenModal] = useState(false)
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null)
  const [search, setSearch] = useState('')

  // Filter workers by search
  const filteredWorkers = workers.filter(w =>
    w.name.toLowerCase().includes(search.toLowerCase()) ||
    w.email.toLowerCase().includes(search.toLowerCase()) ||
    w.skills.toLowerCase().includes(search.toLowerCase())
  )

  const handleOpenModal = (worker: Worker) => {
    setSelectedWorker(worker)
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setSelectedWorker(null)
    setOpenModal(false)
  }

  return (
    <Box sx={{ 
      p: { xs: 2, sm: 3, md: 4 },
      backgroundColor: '#f5f5f5', 
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'stretch', sm: 'center' },
          justifyContent: 'space-between',
          gap: 2,
          mb: 3,
          p: { xs: 2, sm: 3 },
          backgroundColor: '#1a2332',
          color: '#fff',
          borderRadius: 2,
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          textAlign: { xs: 'center', sm: 'left' },
        }}
      >
        <Typography sx={{
          fontSize: { xs: '18px', sm: '22px', md: '24px' },
          fontWeight: 'bold',
          textAlign: isMobile ? 'center' : 'left'
        }}>
          Workers ({workers.length})
        </Typography>
      </Box>

      {/* Search & Filter */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 2,
          alignItems: { xs: 'stretch', sm: 'center' },
          justifyContent: 'space-between',
          backgroundColor: '#fff',
          p: { xs: 2, sm: 3 },
          borderRadius: 2,
          boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
          mb: 3,
        }}
      >
        <TextField
          placeholder="Search by name, email, skills..."
          variant="outlined"
          size="small"
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ flex: 1, '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
        />
        <Button
          variant="outlined"
          startIcon={<FilterList />}
          sx={{ borderRadius: '8px', width: isMobile ? '100%' : 'auto' }}
        >
          Filter
        </Button>
      </Box>

      {/* Workers Table */}
      <WorkerMolecules workers={filteredWorkers} />

      {/* Worker Detail Modal */}
      <WorkerModal
        open={openModal}
        onClose={handleCloseModal}
        workerData={selectedWorker}
      />
    </Box>
  )
}

export default Workers
