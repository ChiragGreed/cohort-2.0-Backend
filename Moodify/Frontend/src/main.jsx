import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './Features/shared/main.scss'
import App from './App.jsx'
import AppRoute from './AppRoute.jsx'
import AuthContextProvider from './Features/auth/state/auth.context.jsx'

createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <AppRoute>
      <App />
    </AppRoute>
  </AuthContextProvider>

)
