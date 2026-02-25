import { Link } from 'react-router'
import '../styles/form.scss'
import axios from 'axios'
import { useState } from 'react';




const Login = () => {

  const [Username, setUsername] = useState('');
  // const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');


  async function submitHandler(e) {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:3900/api/auth/login', {
        username: Username,
        password: Password
      }, { withCredentials: true })
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
        <h2>Login Page</h2>

        <form onSubmit={submitHandler}>
          <input
            onInput={(e) => { setUsername(e.target.value) }}
            type="text"
            value={Username}
            name="username"
            placeholder="Enter your username" />
          <input
            onInput={(e) => { setPassword(e.target.value) }}
            type="text"
            value={Password}
            name="password"
            placeholder="Enter your password" />
          <button>Login</button>
        </form>

        <div className='auth_Navigate'>
          <p>Don't have an Account?</p>
          <Link className="register_Navigate" to='/register'>Register</Link>
        </div>
      </div>
    </main>
  )
}

export default Login
