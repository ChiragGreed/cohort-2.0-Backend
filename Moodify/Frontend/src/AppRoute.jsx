import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Expression from './Features/expressions/pages/Expression'
import Login from './Features/auth/pages/Login'
import Register from './Features/auth/pages/Register'
import Protected from './Features/auth/components/protected'


const AppRoute = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path='/'
                    element=
                    <Protected>
                        <Expression />
                    </Protected>
                />
                <Route
                    path='/login'
                    element=<Login />
                />
                <Route
                    path='/register'
                    element=<Register />
                />
            </Routes>
        </BrowserRouter>

    )
}

export default AppRoute
