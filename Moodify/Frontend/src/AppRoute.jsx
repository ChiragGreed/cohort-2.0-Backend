import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from './Features/auth/pages/Login'
import Register from './Features/auth/pages/Register'
import Protected from './Features/auth/components/protected'
import Home from './Features/Home/pages/Home'
import Player from './Features/Home/components/player'


const AppRoute = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path='/'
                    element=
                    <Protected>
                        <Home />
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
