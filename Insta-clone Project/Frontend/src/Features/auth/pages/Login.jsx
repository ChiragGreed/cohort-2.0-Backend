import { Link, useNavigate } from 'react-router'
import '../style/form.scss'
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';


const Login = () => {

  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  // const [Email, setEmail] = useState('');
  
  const {loginHandler,loading} = useAuth();
  const navigate = useNavigate();

  if(loading) return <h1>Loading...</h1>


  async function submitHandler(e) {
    e.preventDefault();

    await loginHandler(Username,Password)
    .then(res=>{
      console.log(res);
    })

    navigate('/');

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
