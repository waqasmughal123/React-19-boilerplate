
import React, { useState } from 'react'
import {
  Box,
  Card,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  IconButton,
  Checkbox,
  Chip,
  useTheme,
  useMediaQuery,
  Pagination,
  TableContainer,
  Paper,
  Modal,
  Typography,
  Divider,
  Grid,
  Button,
} from '@mui/material'
import { Edit, Delete, Visibility, Close } from '@mui/icons-material'

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

interface WorkersTableProps {
  workers: Worker[]
  onEdit: (worker: Worker) => void
  onDelete: (id: number) => void
  onToggleActive: (id: number) => void
}

const WorkersTable: React.FC<WorkersTableProps> = ({
  workers,
  onEdit,
  onDelete,
  onToggleActive,
}) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const [page, setPage] = useState(1)
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const rowsPerPage = 5

  const indexOfLastRow = page * rowsPerPage
  const indexOfFirstRow = indexOfLastRow - rowsPerPage
  const currentRows = workers.slice(indexOfFirstRow, indexOfLastRow)
  const pageCount = Math.ceil(workers.length / rowsPerPage)

  // Styles
  const cellStyle = {
    px: 2,
    py: isMobile ? 0.5 : 1.5,
    fontSize: isMobile ? '0.75rem' : '0.875rem',
    whiteSpace: 'nowrap',
  }
  const headerCellStyle = {
    ...cellStyle,
    fontWeight: 600,
    color: '#333',
    borderBottom: '1px solid #e0e0e0',
  }
  const bodyCellStyle = {
    ...cellStyle,
    color: '#4b5563',
  }

  const handleViewDetails = (worker: Worker) => {
    setSelectedWorker(worker)
    setIsDetailModalOpen(true)
  }

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false)
    setSelectedWorker(null)
  }

  return (
    <>
      <Card
        sx={{
          borderRadius: 2,
          border: '1px solid #e0e0e0',
          overflow: 'hidden',
          width: '100%',
        }}
      >
        <TableContainer
          component={Paper}
          sx={{
            width: '100%',
            overflowX: 'auto',
            '&::-webkit-scrollbar': { height: 8 },
            '&::-webkit-scrollbar-thumb': { backgroundColor: '#aaa', borderRadius: 2 },
          }}
        >
          <Table
            sx={{
              minWidth: isMobile ? 400 : 900,
              tableLayout: 'auto',
            }}
            size={isMobile ? 'small' : 'medium'}
          >
            <TableHead>
              <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                <TableCell sx={headerCellStyle}>Name</TableCell>
                <TableCell sx={headerCellStyle}>Email</TableCell>
                {!isMobile && <TableCell sx={headerCellStyle}>Phone</TableCell>}
                <TableCell sx={headerCellStyle}>Status</TableCell>
                {!isMobile && <TableCell sx={headerCellStyle}>Skills</TableCell>}
                {!isMobile && <TableCell sx={headerCellStyle}>Hire Date</TableCell>}
                <TableCell sx={headerCellStyle}>Active</TableCell>
                <TableCell sx={headerCellStyle}>Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {currentRows.map((worker) => (
                <TableRow
                  key={worker.id}
                  sx={{ '&:hover': { bgcolor: '#f9fafb' } }}
                >
                  <TableCell
                    sx={{ ...bodyCellStyle, fontWeight: 500, color: '#1f2937' }}
                  >
                    {worker.name}
                  </TableCell>
                  <TableCell sx={bodyCellStyle}>
                    {isMobile
                      ? worker.email.split('@')[0] + '@...'
                      : worker.email}
                  </TableCell>
                  {!isMobile && <TableCell sx={bodyCellStyle}>{worker.phone}</TableCell>}
                  <TableCell sx={bodyCellStyle}>
                    <Chip
                      label={worker.status}
                      sx={{
                        bgcolor:
                          worker.status === 'ACTIVE' ? '#10b981' : '#ef4444',
                        color: '#fff',
                        height: 24,
                        fontWeight: 500,
                        fontSize: '0.75rem',
                      }}
                      size="small"
                    />
                  </TableCell>
                  {!isMobile && <TableCell sx={bodyCellStyle}>{worker.skills}</TableCell>}
                  {!isMobile && (
                    <TableCell sx={bodyCellStyle}>
                      {new Date(worker.hireDate).toLocaleDateString()}
                    </TableCell>
                  )}
                  <TableCell sx={bodyCellStyle}>
                    <Checkbox
                      checked={worker.active}
                      onChange={() => onToggleActive(worker.id)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell sx={bodyCellStyle}>
                    <Tooltip title="View Details">
                      <IconButton
                        onClick={() => handleViewDetails(worker)}
                        sx={{
                          color: '#ffd600',
                          p: 0.5,
                          '&:hover': { bgcolor: '#f3f4f6', color: '#3b82f6' },
                        }}
                      >
                        <Visibility fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    {!isMobile && (
                      <>
                        <Tooltip title="Edit">
                          <IconButton
                            onClick={() => onEdit(worker)}
                            sx={{
                              color: '#10b981',
                              p: 0.5,
                              '&:hover': { bgcolor: '#f3f4f6', color: '#059669' },
                            }}
                          >
                            <Edit fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton
                            onClick={() => onDelete(worker.id)}
                            sx={{
                              color: '#ef4444',
                              p: 0.5,
                              '&:hover': { bgcolor: '#f3f4f6', color: '#dc2626' },
                            }}
                          >
                            <Delete fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* Pagination */}
      {pageCount > 1 && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            mt: 2,
          }}
        >
          <Pagination
            count={pageCount}
            page={page}
            onChange={(_, value) => setPage(value)}
            color="primary"
            shape="rounded"
            size={isMobile ? 'small' : 'medium'}
            siblingCount={isMobile ? 0 : 1}
          />
        </Box>
      )}

      {/* Worker Detail Modal */}
      <Modal
        open={isDetailModalOpen}
        onClose={handleCloseDetailModal}
        closeAfterTransition
        BackdropProps={{ timeout: 500 }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '90%', sm: '500px' },
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            maxHeight: '90vh',
            overflowY: 'auto',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 3,
            }}
          >
            <Typography variant="h6" component="h2" fontWeight="bold">
              Worker Details
            </Typography>
            <IconButton onClick={handleCloseDetailModal}>
              <Close />
            </IconButton>
          </Box>

          <Divider sx={{ mb: 3 }} />

          {selectedWorker && (
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Name
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {selectedWorker.name}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Email
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {selectedWorker.email}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Phone
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {selectedWorker.phone}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Status
                </Typography>
                <Chip
                  label={selectedWorker.status}
                  sx={{
                    bgcolor:
                      selectedWorker.status === 'ACTIVE' ? '#10b981' : '#ef4444',
                    color: '#fff',
                    fontWeight: 500,
                  }}
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Skills
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {selectedWorker.skills}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Hire Date
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {new Date(selectedWorker.hireDate).toLocaleDateString()}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Active
                </Typography>
                <Checkbox
                  checked={selectedWorker.active}
                  onChange={() => onToggleActive(selectedWorker.id)}
                  size="small"
                />
              </Grid>
              {selectedWorker.address && (
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Address
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {selectedWorker.address}
                  </Typography>
                </Grid>
              )}
              {selectedWorker.shifts && (
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Shifts
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {selectedWorker.shifts}
                  </Typography>
                </Grid>
              )}
            </Grid>
          )}

          <Divider sx={{ my: 3 }} />

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: 1.5,
              mt: 2,
            }}
          >
            <Button
              variant="outlined"
              onClick={handleCloseDetailModal}
              sx={{
                borderRadius: 1,
              }}
            >
              Close
            </Button>
            {selectedWorker && (
              <>
                <Button
                  variant="contained"
                  onClick={() => {
                    onEdit(selectedWorker)
                    handleCloseDetailModal()
                  }}
                  sx={{
                    backgroundColor: '#10b981',
                    '&:hover': { backgroundColor: '#059669' },
                    borderRadius: 1,
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    onDelete(selectedWorker.id)
                    handleCloseDetailModal()
                  }}
                  sx={{
                    backgroundColor: '#ef4444',
                    '&:hover': { backgroundColor: '#dc2626' },
                    borderRadius: 1,
                  }}
                >
                  Delete
                </Button>
              </>
            )}
          </Box>
        </Box>
      </Modal>
    </>
  )
}

export default WorkersTable
