import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import '../style/auth.scss'

const Register = () => {


  const { RegisterHandler } = useAuth();

  const [Username, setUsername] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const navigate = useNavigate();

  async function submitHandler(e) {
    e.preventDefault();

    await RegisterHandler(Username, Email, Password);
    navigate('/');

  }


  return (
    <main>

      <div className='register_page'>

        <h1>Register Page</h1>
        <form className='register_form' onSubmit={(e) => { submitHandler(e) }}>

          <input onChange={(e) => { setUsername(e.target.value) }} value={Username} required placeholder='Enter username' />
          <input onChange={(e) => { setEmail(e.target.value) }} value={Email} required placeholder='Enter email' />
          <input onChange={(e) => { setPassword(e.target.value) }} value={Password} required placeholder='Enter password' />

          <button>Register</button>

        </form>
        
        <div className='AuthNavigate'>

          <p>Already a user?</p>
          <Link to='/login'>Login</Link>

        </div>

      </div>

    </main>
  )
}

export default Register
