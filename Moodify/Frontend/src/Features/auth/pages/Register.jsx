import React, { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import '../style/login.scss'

const Register = () => {


  const { RegisterHandler } = useAuth();

  const [Username, setUsername] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');

  async function submitHandler(e) {
    e.preventDefault();

    await RegisterHandler(Username,Email, Password);

  }


  return (
    <main>

      <div className='login_page'>

        <h1>Register Page</h1>
        <form className='login_form' onSubmit={(e) => { submitHandler(e) }}>

          <input onChange={(e) => { setUsername(e.target.value) }} value={Username} required placeholder='Enter username' />
          <input onChange={(e) => { setEmail(e.target.value) }} value={Email} required placeholder='Enter email' />
          <input onChange={(e) => { setPassword(e.target.value) }} value={Password} required placeholder='Enter password' />

          <button>Register</button>

        </form>

      </div>

    </main>
  )
}

export default Register
