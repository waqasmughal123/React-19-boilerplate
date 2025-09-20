import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { store } from '@store/index'
import { ThemeProvider } from './theme'
import App from './App'
import './index.css'
import { SnackbarProvider } from 'notistack'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider defaultMode="light">
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          autoHideDuration={3000}
          preventDuplicate
          classes={{
            variantSuccess: 'bg-black text-[#FFD600]',
            variantError: 'bg-black text-[#FFD600]',
            variantWarning: 'bg-black text-[#FFD600]',
            variantInfo: 'bg-black text-[#FFD600]',
          }}
        >
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </SnackbarProvider>
      </ThemeProvider>
    </Provider>
  </StrictMode>,
)
