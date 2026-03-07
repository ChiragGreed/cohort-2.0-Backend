import '../style/form.scss'
import { Link, useNavigate } from 'react-router'
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';


const Login = () => {

  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  // const [Email, setEmail] = useState('');

  const { loginHandler, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) return (
    <main>
      <h1>Loading...</h1>
    </main>)


  async function submitHandler(e) {
    e.preventDefault();

    await loginHandler(Username, Password)

    navigate('/');

  }


  return (
    <main className='login_page'>
      <div className='form_container'>
        <h2>Login Page</h2>

        <form onSubmit={submitHandler}>
          <input
            onInput={(e) => { setUsername(e.target.value) }}
            type="text"
            value={Username}
            name="username"
            required
            placeholder="Enter your username" />
          <input
            onInput={(e) => { setPassword(e.target.value) }}
            type="text"
            value={Password}
            name="password"
            required
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
