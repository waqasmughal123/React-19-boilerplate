
import React, { useEffect, useState } from 'react'
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  Divider,
  FormControl,
  InputLabel,
  Modal,
  Backdrop,
  Fade,
  useTheme,
  useMediaQuery,
} from '@mui/material'
import { useSnackbar } from 'notistack'

export interface Worker {
  id?: number
  name: string
  email: string
  phone: string
  status: string
  skills: string[]
  hireDate: string
  active: boolean
  address: string
  shifts: string
}

interface WorkerModalProps {
  open: boolean
  onClose: () => void
  mode: 'add' | 'edit'
  workerData: Worker | null
  onSave: (workerData: Partial<Worker>) => Promise<void>
}

const formatDateForInput = (isoString: string | null) => {
  if (!isoString) return ''
  return isoString.split('T')[0]
}

const WorkerModal: React.FC<WorkerModalProps> = ({
  open,
  onClose,
  mode,
  workerData,
  onSave,
}) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const { enqueueSnackbar } = useSnackbar()

  const [formData, setFormData] = useState<Partial<Worker>>({
    name: '',
    email: '',
    phone: '',
    status: 'ACTIVE',
    skills: [],
    hireDate: '',
    active: true,
    address: '',
    shifts: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (workerData) {
      const skillsArray =
        typeof workerData.skills === 'string'
          ? workerData.skills.split(',').map((s) => s.trim())
          : workerData.skills || []
      setFormData({ ...workerData, skills: skillsArray })
    } else {
      setFormData({
        name: '',
        email: '',
        phone: '',
        status: 'ACTIVE',
        skills: [],
        hireDate: '',
        active: true,
        address: '',
        shifts: '',
      })
    }
    setErrors({})
  }, [workerData, open])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (
    e: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name as string]: value }))
  }

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.name?.trim()) newErrors.name = 'Name is required'
    if (!formData.email?.trim()) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = 'Invalid email format'
    if (!formData.phone?.trim()) newErrors.phone = 'Phone is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validate()) return

    const payload = {
      ...formData,
      skills:
        typeof formData.skills === 'string'
          ? formData.skills.split(',').map((s) => s.trim()).filter(Boolean)
          : formData.skills,
    }

    try {
      await onSave(payload)
    } catch (error: any) {
      if (error?.response?.data?.email) {
        enqueueSnackbar('Email already exists', { variant: 'error' })
      } else {
        enqueueSnackbar('Something went wrong', { variant: 'error' })
      }
    }
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500, sx: { backgroundColor: 'rgba(0,0,0,0.5)' } }}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: 'absolute',
            top: '65%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '95%', sm: '80%', md: 600 },
            maxHeight: '90vh',
            overflowY: 'auto',
            backgroundColor: '#fff',
            p: { xs: 2, sm: 3 },
            borderRadius: 3,
            boxShadow: 24,
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: 'bold', fontSize:"34px", mb: 3, textAlign: 'center', color: '#1a2332' }}
          >
            {mode === 'add' ? 'Add New Worker' : 'Edit Worker'}
          </Typography>

          <Divider sx={{ mb: 3 }} />

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formData.name || ''}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={formData.email || ''}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              fullWidth
              label="Phone"
              name="phone"
              value={formData.phone || ''}
              onChange={handleChange}
              error={!!errors.phone}
              helperText={errors.phone}
            />
            <TextField
              fullWidth
              label="Address"
              name="address"
              value={formData.address || ''}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Skills (comma separated)"
              name="skills"
              value={
                Array.isArray(formData.skills)
                  ? formData.skills.join(', ')
                  : formData.skills
              }
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Hire Date"
              type="date"
              name="hireDate"
              value={formatDateForInput(formData.hireDate)}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              size="small"
            />
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                name="status"
                value={formData.status || 'ACTIVE'}
                onChange={handleSelectChange}
              >
                <MenuItem value="ACTIVE">Active</MenuItem>
                <MenuItem value="INACTIVE">Inactive</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3, gap: 2 }}>
            <Button onClick={onClose}>Cancel</Button>
            <Button
              onClick={handleSubmit}
              sx={{ bgcolor: '#ffd600', fontWeight: 'bold' }}
            >
              {mode === 'add' ? 'Create' : 'Update'}
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  )
}

export default WorkerModal
