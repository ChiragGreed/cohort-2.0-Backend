import { Link, Navigate } from 'react-router'
import '../styles/form.scss'
import axios from 'axios'
import { useState } from 'react';


const Register = () => {

  const [Username, setUsername] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');

  async function submitHandler(e) {
    e.preventDefault();

    try {

      const res = await axios.post('http://localhost:3900/api/auth/register', {
        username: Username,
        email: Email,
        password: Password
      },{withCredentials:true})
        .then((res) => {
          console.log(res.data);
        })
    }

    catch (err) {

      console.log(err);

    }

  }

  return (

    <main>
      <div className='form_container'>
        <h2>Register Page</h2>

        <form onSubmit={submitHandler}>
          <input onInput={(e) => { setUsername(e.target.value) }} type="text" value={Username} name="username" required placeholder="Enter your username" />
          <input onInput={(e) => { setEmail(e.target.value) }} type="text" value={Email} name="email" required placeholder="Enter your email id" />
          <input onInput={(e) => { setPassword(e.target.value) }} type="text" value={Password} name="password" required placeholder="Enter your password" />
          <button>Register</button>
        </form>

        <div className='auth_Navigate'>
          <p>Already have an Account?</p>
          <Link className="register_Navigate" to='/login'>Login</Link>
        </div>
      </div>
    </main>
  )
}

export default Register
