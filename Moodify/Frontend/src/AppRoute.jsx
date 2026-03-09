import Login from './Features/auth/pages/login'
import Register from './Features/auth/pages/register'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Expression from './Features/expressions/pages/Expression'

const AppRoute = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element=<Expression/> />
                <Route path='/login' element=<Login /> />
                <Route path='/register' element=<Register /> />
            </Routes>
        </BrowserRouter>

    )
}

export default AppRoute
