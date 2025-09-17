
// import React from 'react'
// import {
//   Box,
//   Typography,
//   TextField,
//   Select,
//   MenuItem,
//   Button,
//   Divider,
//   FormControl,
//   InputLabel,
//   Modal,
//   Backdrop,
//   Fade,
//   useTheme,
//   useMediaQuery,
// } from '@mui/material'

// interface Worker {
//   id: number
//   name: string
//   email: string
//   phone: string
//   status: 'ACTIVE' | 'INACTIVE'
//   skills: string
//   hireDate: string
//   active: boolean
//   address?: string
//   shifts?: string
// }

// interface WorkerModalProps {
//   open: boolean
//   onClose: () => void
//   mode: 'add' | 'edit'
//   workerData: Worker | null
//   onSave: (workerData: Partial<Worker>) => void
// }

// const WorkerModal: React.FC<WorkerModalProps> = ({ open, onClose, mode, workerData, onSave }) => {
//   const theme = useTheme()
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
//   const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'))
//   const isExtraSmall = useMediaQuery(theme.breakpoints.down('xs'))
  
//   const [formData, setFormData] = React.useState<Partial<Worker>>({
//     name: '',
//     email: '',
//     phone: '',
//     status: 'ACTIVE',
//     skills: '',
//     hireDate: '',
//     active: true,
//     address: '',
//     shifts: '',
//   })

//   React.useEffect(() => {
//     if (workerData) setFormData(workerData)
//     else setFormData({ 
//       name: '', 
//       email: '', 
//       phone: '', 
//       status: 'ACTIVE', 
//       skills: '', 
//       hireDate: '', 
//       active: true, 
//       address: '', 
//       shifts: '' 
//     })
//   }, [workerData, open])

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<{ name?: string; value: unknown }>) => {
//     const { name, value } = e.target
//     if (name) setFormData(prev => ({ ...prev, [name]: value }))
//   }

//   const handleSelectChange = (e: React.ChangeEvent<{ name?: string; value: unknown }>) => {
//     const { name, value } = e.target
//     if (name) setFormData(prev => ({ ...prev, [name]: value }))
//   }

//   const handleSubmit = () => onSave(formData)

//   return (
//     <Modal
//       open={open}
//       onClose={onClose}
//       closeAfterTransition
//       BackdropComponent={Backdrop}
//       BackdropProps={{ timeout: 500, sx: { backgroundColor: 'rgba(0,0,0,0.5)' } }}
//     >
//       <Fade in={open}>
//         <Box sx={{
//           position: 'absolute',
//           top: '60%',
//           left: '50%',
//           transform: 'translate(-50%, -50%)',
//           width: { 
//             xs: '98%', 
//             sm: isTablet ? '85%' : '600px',
//             md: '600px',
//             lg: '650px'
//           },
//           maxWidth: '700px',
//           maxHeight: { xs: '95vh', sm: '90vh' },
//           overflowY: 'auto',
//           backgroundColor: '#fff',
//           padding: { 
//             xs: '12px', 
//             sm: '20px', 
//             md: '24px' 
//           },
//           borderRadius: { xs: '6px', sm: '8px', md: '12px' },
//           boxShadow: {
//             xs: '0 2px 15px rgba(0,0,0,0.1)',
//             sm: '0 4px 20px rgba(0,0,0,0.15)',
//             md: '0 8px 30px rgba(0,0,0,0.2)'
//           },
//           outline: 'none',
//           margin: { xs: '8px', sm: '0' }
//         }}>
//           <Typography 
//             variant="h6" 
//             sx={{ 
//               fontWeight: 'bold', 
//               mb: 3, 
//               textAlign: 'center', 
//               color: '#1a2332',
//               fontSize: isMobile ? '1.25rem' : '1.5rem'
//             }}
//           >
//             {mode === 'add' ? 'Add New Worker' : 'Edit Worker'}
//           </Typography>

//           <Typography 
//             variant="subtitle1" 
//             sx={{ 
//               fontWeight: 600, 
//               mb: 2, 
//               color: '#374151', 
//               borderBottom: '1px solid #e5e7eb', 
//               pb: 1,
//               fontSize: isMobile ? '0.9rem' : '1rem'
//             }}
//           >
//             Personal Information
//           </Typography>

//           <Box sx={{ display: 'flex', flexDirection: 'column', gap: isMobile ? 1 : 2 }}>
//             <TextField 
//               fullWidth 
//               label="Name" 
//               name="name" 
//               value={formData.name || ''} 
//               onChange={handleChange} 
//               required
//               size="small"
//               sx={{ 
//                 '& .MuiInputBase-root': { height: isMobile ? '36px' : '40px' }, 
//                 '& .MuiOutlinedInput-root': { borderRadius: '4px' }, 
//                 '& .MuiInputLabel-root': { fontSize: isMobile ? '0.8rem' : '0.875rem' } 
//               }}
//             />

//             <Box sx={{ display: 'flex', gap: isMobile ? 1 : 2, flexDirection: isMobile ? 'column' : 'row' }}>
//               <TextField 
//                 fullWidth 
//                 label="Email" 
//                 name="email" 
//                 value={formData.email || ''} 
//                 onChange={handleChange} 
//                 required
//                 size="small"
//                 sx={{ 
//                   '& .MuiInputBase-root': { height: isMobile ? '36px' : '40px' }, 
//                   '& .MuiOutlinedInput-root': { borderRadius: '4px' }, 
//                   '& .MuiInputLabel-root': { fontSize: isMobile ? '0.8rem' : '0.875rem' } 
//                 }}
//               />

//               <TextField 
//                 fullWidth 
//                 label="Phone" 
//                 name="phone" 
//                 value={formData.phone || ''} 
//                 onChange={handleChange} 
//                 required
//                 size="small"
//                 sx={{ 
//                   '& .MuiInputBase-root': { height: isMobile ? '36px' : '40px' }, 
//                   '& .MuiOutlinedInput-root': { borderRadius: '4px' }, 
//                   '& .MuiInputLabel-root': { fontSize: isMobile ? '0.8rem' : '0.875rem' } 
//                 }}
//               />
//             </Box>

//             <TextField 
//               fullWidth 
//               label="Address" 
//               name="address" 
//               value={formData.address || ''} 
//               onChange={handleChange}
//               size="small"
//               sx={{ 
//                 '& .MuiInputBase-root': { height: isMobile ? '36px' : '40px' }, 
//                 '& .MuiOutlinedInput-root': { borderRadius: '4px' }, 
//                 '& .MuiInputLabel-root': { fontSize: isMobile ? '0.8rem' : '0.875rem' } 
//               }}
//             />
//           </Box>

//           <Divider sx={{ my: isMobile ? 2 : 3, borderColor: '#e5e7eb' }} />

//           <Typography 
//             variant="subtitle1" 
//             sx={{ 
//               fontWeight: 600, 
//               mb: 2, 
//               color: '#374151', 
//               borderBottom: '1px solid #e5e7eb', 
//               pb: 1,
//               fontSize: isMobile ? '0.9rem' : '1rem'
//             }}
//           >
//             Work Information
//           </Typography>

//           <Box sx={{ display: 'flex', flexDirection: 'column', gap: isMobile ? 1 : 2 }}>
//             <Box sx={{ display: 'flex', gap: isMobile ? 1 : 2, flexDirection: isMobile ? 'column' : 'row' }}>
//               {mode === 'add' ? (
//                 <FormControl fullWidth size="small">
//                   <InputLabel>Shifts</InputLabel>
//                   <Select 
//                     name="shifts" 
//                     value={formData.shifts || ''} 
//                     onChange={(e) => handleSelectChange(e as React.ChangeEvent<{ name?: string; value: unknown }>)}
//                     sx={{ 
//                       '& .MuiSelect-select': { py: 1 }, 
//                       '& .MuiOutlinedInput-root': { borderRadius: '4px' } 
//                     }}
//                   >
//                     <MenuItem value="morning">Morning</MenuItem>
//                     <MenuItem value="afternoon">Afternoon</MenuItem>
//                     <MenuItem value="night">Night</MenuItem>
//                   </Select>
//                 </FormControl>
//               ) : (
//                 <TextField 
//                   fullWidth 
//                   label="Skills" 
//                   name="skills" 
//                   value={formData.skills || ''} 
//                   onChange={handleChange} 
//                   required
//                   size="small"
//                   sx={{ 
//                     '& .MuiInputBase-root': { height: isMobile ? '36px' : '40px' }, 
//                     '& .MuiOutlinedInput-root': { borderRadius: '4px' }, 
//                     '& .MuiInputLabel-root': { fontSize: isMobile ? '0.8rem' : '0.875rem' } 
//                   }}
//                 />
//               )}

//               <TextField 
//                 fullWidth 
//                 label="Hire Date" 
//                 type="date" 
//                 name="hireDate" 
//                 value={formData.hireDate || ''} 
//                 onChange={handleChange} 
//                 InputLabelProps={{ shrink: true }}
//                 size="small"
//                 sx={{ 
//                   '& .MuiInputBase-root': { height: isMobile ? '36px' : '40px' }, 
//                   '& .MuiOutlinedInput-root': { borderRadius: '4px' }, 
//                   '& .MuiInputLabel-root': { fontSize: isMobile ? '0.8rem' : '0.875rem' } 
//                 }}
//               />
//             </Box>

//             <FormControl fullWidth size="small">
//               <InputLabel>Status</InputLabel>
//               <Select 
//                 name="status" 
//                 value={formData.status || 'ACTIVE'} 
//                 onChange={(e) => handleSelectChange(e as React.ChangeEvent<{ name?: string; value: unknown }>)}
//                 sx={{ 
//                   '& .MuiSelect-select': { py: 1 }, 
//                   '& .MuiOutlinedInput-root': { borderRadius: '4px' } 
//                 }}
//               >
//                 <MenuItem value="ACTIVE">Active</MenuItem>
//                 <MenuItem value="INACTIVE">Inactive</MenuItem>
//               </Select>
//             </FormControl>
//           </Box>

//           <Box sx={{ 
//             display: 'flex', 
//             justifyContent: 'flex-end', 
//             gap: 1, 
//             mt: isMobile ? 2 : 3 
//           }}>
//             <Button 
//               onClick={onClose} 
//               sx={{ 
//                 bgcolor: '#f3f4f6', 
//                 color: '#4b5563', 
//                 minWidth: isMobile ? 60 : 80, 
//                 height: isMobile ? 32 : 36, 
//                 fontWeight: 500, 
//                 '&:hover': { bgcolor: '#e5e7eb' } 
//               }}
//             >
//               Cancel
//             </Button>
//             <Button 
//               onClick={handleSubmit} 
//               sx={{ 
//                 bgcolor: '#ffd600', 
//                 color: '#111827', 
//                 fontWeight: 600, 
//                 minWidth: isMobile ? 100 : 120, 
//                 height: isMobile ? 32 : 36, 
//                 '&:hover': { bgcolor: '#e6c200' } 
//               }}
//             >
//               {mode === 'add' ? 'Create' : 'Update'}
//             </Button>
//           </Box>
//         </Box>
//       </Fade>
//     </Modal>
//   )
// }

// export default WorkerModal



import React from 'react'
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

interface WorkerModalProps {
  open: boolean
  onClose: () => void
  mode: 'add' | 'edit'
  workerData: Worker | null
  onSave: (workerData: Partial<Worker>) => void
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

  const [formData, setFormData] = React.useState<Partial<Worker>>({
    name: '',
    email: '',
    phone: '',
    status: 'ACTIVE',
    skills: '',
    hireDate: '',
    active: true,
    address: '',
    shifts: '',
  })

  React.useEffect(() => {
    if (workerData) setFormData(workerData)
    else
      setFormData({
        name: '',
        email: '',
        phone: '',
        status: 'ACTIVE',
        skills: '',
        hireDate: '',
        active: true,
        address: '',
        shifts: '',
      })
  }, [workerData, open])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    if (name) setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (e: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    const { name, value } = e.target
    if (name) setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = () => onSave(formData)

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
    top: '60%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {
      xs: '95%',  // ✅ Mobile
      sm: '85%',
      md: '600px',
      lg: '650px',
    },
    maxWidth: '100% !important',  // ✅ prevent overflow
    maxHeight: '90vh',
    overflowY: 'auto',
    backgroundColor: '#fff',
    p: { xs: 2, sm: 3 },
    borderRadius: { xs: 2, sm: 3 },
    boxShadow: 24,
  }}
>

          {/* Title */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              mb: 3,
              textAlign: 'center',
              color: '#1a2332',
              fontSize: { xs: '1.2rem', sm: '1.5rem' },
            }}
          >
            {mode === 'add' ? 'Add New Worker' : 'Edit Worker'}
          </Typography>

          {/* Personal Info */}
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 600,
              mb: 2,
              color: '#374151',
              borderBottom: '1px solid #e5e7eb',
              pb: 1,
              fontSize: { xs: '0.9rem', sm: '1rem' },
            }}
          >
            Personal Information
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formData.name || ''}
              onChange={handleChange}
              required
              size="small"
            />

            <Box
              sx={{
                display: 'flex',
                gap: 2,
                flexDirection: { xs: 'column', sm: 'row' },
              }}
            >
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={formData.email || ''}
                onChange={handleChange}
                required
                size="small"
              />

              <TextField
                fullWidth
                label="Phone"
                name="phone"
                value={formData.phone || ''}
                onChange={handleChange}
                required
                size="small"
              />
            </Box>

            <TextField
              fullWidth
              label="Address"
              name="address"
              value={formData.address || ''}
              onChange={handleChange}
              size="small"
            />
          </Box>

          <Divider sx={{ my: 3, borderColor: '#e5e7eb' }} />

          {/* Work Info */}
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 600,
              mb: 2,
              color: '#374151',
              borderBottom: '1px solid #e5e7eb',
              pb: 1,
              fontSize: { xs: '0.9rem', sm: '1rem' },
            }}
          >
            Work Information
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box
              sx={{
                display: 'flex',
                gap: 2,
                flexDirection: { xs: 'column', sm: 'row' },
              }}
            >
              {mode === 'add' ? (
                <FormControl fullWidth size="small">
                  <InputLabel>Shifts</InputLabel>
                  <Select
                    name="shifts"
                    value={formData.shifts || ''}
                    onChange={(e) =>
                      handleSelectChange(
                        e as React.ChangeEvent<{ name?: string; value: unknown }>
                      )
                    }
                  >
                    <MenuItem value="morning">Morning</MenuItem>
                    <MenuItem value="afternoon">Afternoon</MenuItem>
                    <MenuItem value="night">Night</MenuItem>
                  </Select>
                </FormControl>
              ) : (
                <TextField
                  fullWidth
                  label="Skills"
                  name="skills"
                  value={formData.skills || ''}
                  onChange={handleChange}
                  required
                  size="small"
                />
              )}

              <TextField
                fullWidth
                label="Hire Date"
                type="date"
                name="hireDate"
                value={formData.hireDate || ''}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                size="small"
              />
            </Box>

            <FormControl fullWidth size="small">
              <InputLabel>Status</InputLabel>
              <Select
                name="status"
                value={formData.status || 'ACTIVE'}
                onChange={(e) =>
                  handleSelectChange(
                    e as React.ChangeEvent<{ name?: string; value: unknown }>
                  )
                }
              >
                <MenuItem value="ACTIVE">Active</MenuItem>
                <MenuItem value="INACTIVE">Inactive</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Actions */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: 1.5,
              mt: 3,
              flexDirection: { xs: 'column-reverse', sm: 'row' },
            }}
          >
            <Button
              onClick={onClose}
              sx={{
                bgcolor: '#f3f4f6',
                color: '#4b5563',
                fontWeight: 500,
                '&:hover': { bgcolor: '#e5e7eb' },
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              sx={{
                bgcolor: '#ffd600',
                color: '#111827',
                fontWeight: 600,
                '&:hover': { bgcolor: '#e6c200' },
              }}
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
