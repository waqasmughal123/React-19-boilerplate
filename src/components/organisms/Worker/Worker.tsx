
import React, { useState } from 'react'
import {
  Box,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  IconButton,
  OutlinedInput,
  Checkbox,
  ListItemText,
  Card,
  CardContent,
  Grid,
  InputAdornment,
} from '@mui/material'
import { FilterList, Clear, Search } from '@mui/icons-material'
import WorkerModal from '../../molecules/WorkerModal/WorkerModal'
import WorkerMolecules from '../../molecules/WorkerMolecules/WorkerMolecules'

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
interface WorkerProps {
  workers: Worker[]
  loading: Record<string, boolean>
  error: Record<string, string | undefined>
  onAdd: (data: Partial<Worker>) => void
  onUpdate: (id: number, data: Partial<Worker>) => void
  onDelete: (id: number) => void
}

const Workers: React.FC<WorkerProps> = ({
  workers,
  loading,
  error,
  onAdd,
  onUpdate,
  onDelete,
}) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const [openModal, setOpenModal] = useState(false)
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null)
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add')

  // Filters
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('ALL')
  const [skillsFilter, setSkillsFilter] = useState<string[]>([])
  const [activeFilter, setActiveFilter] = useState<string>('ALL')

  // ✅ Handlers for filters
  const handleStatusChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    setStatusFilter(e.target.value as string)
  }

  const handleSkillsChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    setSkillsFilter(e.target.value as string[])
  }

  const handleActiveChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    setActiveFilter(e.target.value as string)
  }

  // ✅ Helper to normalize skills
  const getSkillsAsString = (skills: string | string[] | any): string => {
    if (!skills) return ''
    if (Array.isArray(skills)) return skills.join(', ')
    if (typeof skills === 'string') return skills
    return String(skills || '')
  }

  const allSkills = Array.from(
    new Set(
      workers.flatMap((worker) => {
        const skillsString = getSkillsAsString(worker.skills)
        return skillsString
          .split(',')
          .map((skill) => skill.trim())
          .filter((skill) => skill !== '')
      })
    )
  )

  // ✅ Safe filter
  const filteredWorkers = workers.filter((w) => {
    const skillsString = getSkillsAsString(w.skills)

    const matchesSearch =
      (w.name?.toLowerCase() || '').includes(search.toLowerCase()) ||
      (w.email?.toLowerCase() || '').includes(search.toLowerCase()) ||
      skillsString.toLowerCase().includes(search.toLowerCase())

    const matchesStatus = statusFilter === 'ALL' || w.status === statusFilter
    const matchesActive =
      activeFilter === 'ALL' ||
      (activeFilter === 'ACTIVE' && w.active) ||
      (activeFilter === 'INACTIVE' && !w.active)

    const matchesSkills =
      skillsFilter.length === 0 ||
      skillsFilter.some((skill) =>
        skillsString.toLowerCase().includes(skill.toLowerCase())
      )

    return matchesSearch && matchesStatus && matchesActive && matchesSkills
  })

  // ✅ Modal Handlers
  const handleOpenModal = (worker?: Worker) => {
    if (worker) {
      setSelectedWorker(worker)
      setModalMode('edit')
    } else {
      setSelectedWorker(null)
      setModalMode('add')
    }
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setSelectedWorker(null)
    setOpenModal(false)
  }

 const handleSave = async (data: Partial<Worker>) => {
  try {
    if (modalMode === 'edit' && selectedWorker?.id) {
      await onUpdate(selectedWorker.id, data)
    } else {
      await onAdd(data)
    }
    handleCloseModal()
  } catch (error: any) {
    // Agar backend email error bheje
    if (error?.response?.data?.email) {
      enqueueSnackbar('Email already exists', { variant: 'error' })
    } else {
      enqueueSnackbar('Something went wrong', { variant: 'error' })
    }
  }
}
  const handleDelete = (id: number) => {
    onDelete(id)
  }

  const isFilterActive =
    statusFilter !== 'ALL' ||
    skillsFilter.length > 0 ||
    activeFilter !== 'ALL' ||
    search !== ''

  return (
    <Box sx={{ p: { xs: 2, sm: 3, md: 4 }, minHeight: '100vh', fontFamily: 'Arial, sans-serif', overflowX: 'hidden' }}>
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
          overflowX: 'hidden',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          textAlign: { xs: 'center', sm: 'left' },
        }}
      >
        <Typography sx={{ fontSize: { xs: '18px', sm: '22px', md: '24px' }, fontWeight: 'bold', textAlign: isMobile ? 'center' : 'left' }}>
          Workers ({workers.length})
          {filteredWorkers.length !== workers.length && (
            <Typography component="span" sx={{ fontSize: '0.8em', ml: 1, opacity: 0.8 }}>
              (Showing {filteredWorkers.length})
            </Typography>
          )}
        </Typography>

        <Button
          variant="contained"
          sx={{
            backgroundColor: '#ffd600',
            color: '#000',
            fontWeight: 'bold',
            textTransform: 'none',
            borderRadius: 2,
            px: 3,
            py: 1,
            '&:hover': { backgroundColor: '#b8962f' },
          }}
          onClick={() => handleOpenModal()}
        >
          + Add Worker
        </Button>
      </Box>

      
      {/* Search & Filter */}
      <Card sx={{ mb: 3,  }}>
        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={8}>
              <TextField
                placeholder="Search by name, email, skills..."
                variant="outlined"
                size="medium"
                fullWidth
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '10px',
                    height: '44px',
                    minWidth: '300px'
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search fontSize="small" />
                    </InputAdornment>
                  ),
                  endAdornment: search && (
                    <IconButton
                      size="small"
                      onClick={() => setSearch('')}
                      sx={{ mr: 1 }}
                    >
                      <Clear fontSize="small" />
                    </IconButton>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant="contained"
                  startIcon={<FilterList />}
                  sx={{
                    borderRadius: '8px',
                    backgroundColor: '#000',
                    color: '#fff',
                    '&:hover': {
                      backgroundColor: '#333',
                    },
                  }}
                >
                  Filter
                  {isFilterActive && (
                    <Chip
                      label="Active"
                      size="small"
                      sx={{
                        ml: 1,
                        height: 20,
                        fontSize: '0.7rem',
                        backgroundColor: '#D4AF37',
                        color: 'black',
                        fontWeight: 'bold',
                      }}
                    />
                  )}
                </Button>
              </Box>
            </Grid>
          </Grid>

          {/* Filter Dropdowns */}
          <Box sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              {/* Status Filter */}
              <Grid item xs={12} sm={6}>
                <Box>
                  <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 1 }}>
                    Status
                  </Typography>
                  <FormControl fullWidth size="small">
                    <InputLabel id="status-filter-label">Status</InputLabel>
                    <Select
                      labelId="status-filter-label"
                      value={statusFilter}
                      label="Status"
                      onChange={handleStatusChange}
                      sx={{
                        minWidth: '200px',
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'primary.main',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'secondary.main',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#D4AF37',
                        },
                      }}
                    >
                      <MenuItem value="ALL">All</MenuItem>
                      <MenuItem value="ACTIVE">Active</MenuItem>
                      <MenuItem value="INACTIVE">Inactive</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Grid>

              {/* Skills Filter */}
              <Grid item xs={12} sm={6}>
                <Box>
                  <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 1 }}>
                    Skills
                  </Typography>
                  <FormControl fullWidth size="small">
                    <InputLabel id="skills-filter-label">Skills</InputLabel>
                    <Select
                      labelId="skills-filter-label"
                      multiple
                      value={skillsFilter}
                      onChange={handleSkillsChange}
                      input={<OutlinedInput label="Skills" />}
                      renderValue={(selected) => selected.join(', ')}
                      sx={{
                        minWidth: '200px',
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'primary.main',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'secondary.main',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#D4AF37',
                        },
                      }}
                    >
                      {allSkills.map((skill) => (
                        <MenuItem key={skill} value={skill}>
                          <Checkbox checked={skillsFilter.indexOf(skill) > -1} />
                          <ListItemText primary={skill} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>

      {/* Active Filters */}
      {isFilterActive && (
        <Card sx={{ mb: 2, borderRadius: 2, boxShadow: '0 2px 6px rgba(0,0,0,0.05)' }}>
          <CardContent sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              <Typography variant="subtitle2" sx={{ mr: 1, fontWeight: 'bold' }}>
                Active Filters:
              </Typography>
              {search && (
                <Chip
                  label={`Search: ${search}`}
                  size="small"
                  onDelete={() => setSearch('')}
                  color="primary"
                  variant="outlined"
                />
              )}
              {statusFilter !== 'ALL' && (
                <Chip
                  label={`Status: ${statusFilter}`}
                  size="small"
                  onDelete={() => setStatusFilter('ALL')}
                  color="primary"
                  variant="outlined"
                />
              )}
              {activeFilter !== 'ALL' && (
                <Chip
                  label={`Active: ${activeFilter}`}
                  size="small"
                  onDelete={() => setActiveFilter('ALL')}
                  color="primary"
                  variant="outlined"
                />
              )}
              {skillsFilter.length > 0 && (
                <Chip
                  label={`Skills: ${skillsFilter.join(', ')}`}
                  size="small"
                  onDelete={() => setSkillsFilter([])}
                  color="primary"
                  variant="outlined"
                />
              )}
            </Box>
          </CardContent>
        </Card>
      )}
      {/* Workers Table */}
      {loading['workers'] ? (
        <Typography>Loading workers...</Typography>
      ) : error['workers'] ? (
        <Typography color="error">{error['workers']}</Typography>
      ) : (
        <WorkerMolecules
          workers={filteredWorkers}
          onEdit={(worker) => handleOpenModal(worker)}
          onDelete={handleDelete}
        />
      )}

      {/* Worker Modal */}
      <WorkerModal
        open={openModal}
        onClose={handleCloseModal}
        workerData={selectedWorker}
        mode={modalMode}
        onSave={handleSave}
      />
    </Box>
  )
}

export default Workers
