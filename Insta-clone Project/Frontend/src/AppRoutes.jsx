import { Routes, Route } from 'react-router-dom'
import Login from './Features/auth/pages/Login'
import Register from './Features/auth/pages/Register'

const AppRoutes = () => {
  return (
      <Routes>
        <Route path='/login' element=<Login /> />
        <Route path='/register' element=<Register /> />
      </Routes>
  )
}

export default AppRoutes
