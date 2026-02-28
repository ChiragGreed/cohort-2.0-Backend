import App from './App.jsx'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

// Contexts
import AuthProvider from './Features/auth/authContext.jsx'
import PostProvider from './Features/post/postContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <PostProvider>
        <App />
      </PostProvider>
    </AuthProvider>
  </BrowserRouter>
)
