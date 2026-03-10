import React, { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useNavigate, Link } from 'react-router-dom'
import '../style/auth.scss'

const Login = () => {


  const { LoginHandler } = useAuth();

  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  
  const navigate = useNavigate();

  async function submitHandler(e) {
    e.preventDefault();

    await LoginHandler(Username, Password);
    
    navigate('/');


  }


  return (
    <main>

      <div className='login_page'>

        <h1>Login Page</h1>
        <form className='login_form' onSubmit={(e) => { submitHandler(e) }}>

          <input onChange={(e) => { setUsername(e.target.value) }} value={Username} required placeholder='Enter username' />
          <input onChange={(e) => { setPassword(e.target.value) }} value={Password} required placeholder='Enter password' />

          <button>Login</button>

        </form>

        <div className='AuthNavigate'>

          <p>Don't have an account?</p>
          <Link to='/register'>Create Account</Link>

        </div>

      </div>

    </main>
  )
}

export default Login
