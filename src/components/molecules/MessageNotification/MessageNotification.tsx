import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Snackbar,
  Alert,
  AlertTitle,
  Button,
  Box,
  Slide,
  SlideProps,
} from '@mui/material'
import { RootState } from '@store/index'
import { removeMessage } from '@store/slices/crudSlice'
import type { Message } from '../../../types/crud'

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="up" />
}

interface MessageNotificationProps {
  autoHideDuration?: number
  maxVisible?: number
  anchorOrigin?: {
    vertical: 'top' | 'bottom'
    horizontal: 'left' | 'center' | 'right'
  }
}

export const MessageNotification: React.FC<MessageNotificationProps> = ({
  autoHideDuration = 6000,
  maxVisible = 3,
  anchorOrigin = { vertical: 'top', horizontal: 'right' }
}) => {
  const dispatch = useDispatch()
  const messages = useSelector((state: RootState) => state.messages.messages)

  const handleClose = (messageId: string) => {
    dispatch(removeMessage(messageId))
  }

  // Auto-hide messages after duration
  useEffect(() => {
    messages.forEach(message => {
      const duration = message.duration || autoHideDuration
      
      if (duration > 0) {
        const timer = setTimeout(() => {
          handleClose(message.id)
        }, duration)

        return () => clearTimeout(timer)
      }
    })
  }, [messages, autoHideDuration])

  // Show only the latest messages up to maxVisible
  const visibleMessages = messages.slice(-maxVisible)

  return (
    <Box
      sx={{
        position: 'fixed',
        top: anchorOrigin.vertical === 'top' ? 24 : 'auto',
        bottom: anchorOrigin.vertical === 'bottom' ? 24 : 'auto',
        left: anchorOrigin.horizontal === 'left' ? 24 : 'auto',
        right: anchorOrigin.horizontal === 'right' ? 24 : 'auto',
        transform: anchorOrigin.horizontal === 'center' ? 'translateX(-50%)' : 'none',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        maxWidth: 400,
        width: '100%',
      }}
    >
      {visibleMessages.map((message, index) => (
        <MessageItem
          key={message.id}
          message={message}
          onClose={() => handleClose(message.id)}
          delay={index * 100} // Stagger animation
        />
      ))}
    </Box>
  )
}

interface MessageItemProps {
  message: Message
  onClose: () => void
  delay?: number
}

const MessageItem: React.FC<MessageItemProps> = ({ message, onClose, delay = 0 }) => {
  const [open, setOpen] = React.useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setOpen(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  const handleClose = () => {
    setOpen(false)
    setTimeout(onClose, 300) // Wait for exit animation
  }

  const getSeverity = () => {
    switch (message.type) {
      case 'success':
        return 'success'
      case 'error':
        return 'error'
      case 'warning':
        return 'warning'
      case 'info':
      default:
        return 'info'
    }
  }

  return (
    <Snackbar
      open={open}
      onClose={handleClose}
      TransitionComponent={SlideTransition}
      sx={{
        position: 'relative',
        width: '100%',
        '& .MuiSnackbarContent-root': {
          width: '100%',
        },
      }}
    >
      <Alert
        severity={getSeverity()}
        onClose={handleClose}
        variant="filled"
        sx={{
          width: '100%',
          boxShadow: 3,
          '& .MuiAlert-message': {
            width: '100%',
          },
        }}
        action={
          message.action ? (
            <Button
              color="inherit"
              size="small"
              onClick={() => {
                message.action?.onClick()
                handleClose()
              }}
            >
              {message.action.label}
            </Button>
          ) : undefined
        }
      >
        {message.title && <AlertTitle>{message.title}</AlertTitle>}
        {message.message}
      </Alert>
    </Snackbar>
  )
}

// Hook to easily add messages
export const useMessage = () => {
  const dispatch = useDispatch()

  const addMessage = (message: Omit<Message, 'id'>) => {
    dispatch({ type: 'messages/addMessage', payload: message })
  }

  const addSuccess = (message: string, title?: string, action?: Message['action']) => {
    addMessage({ type: 'success', message, title, action })
  }

  const addError = (message: string, title?: string, action?: Message['action']) => {
    addMessage({ type: 'error', message, title, action, duration: 8000 })
  }

  const addWarning = (message: string, title?: string, action?: Message['action']) => {
    addMessage({ type: 'warning', message, title, action })
  }

  const addInfo = (message: string, title?: string, action?: Message['action']) => {
    addMessage({ type: 'info', message, title, action })
  }

  return {
    addMessage,
    addSuccess,
    addError,
    addWarning,
    addInfo,
  }
}
