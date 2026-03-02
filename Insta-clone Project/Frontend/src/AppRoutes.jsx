import { Routes, Route } from 'react-router-dom'
import Login from './Features/auth/pages/Login'
import Register from './Features/auth/pages/Register'
import Feed from './Features/post/Pages/Home'
import CreatePost from './Features/post/Pages/createPost'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element=<Feed /> />
      <Route path='/login' element=<Login /> />
      <Route path='/register' element=<Register /> />

      <Route path='/createPost' element=<CreatePost /> />
    </Routes>
  )
}

export default AppRoutes
