import React from 'react'
import '../styles/login.css'
import { Link } from 'react-router-dom'

const LoginPage = () => {
  return (
    <div className='Loginpage'>
      <div className='login-card'>

        {/* Left image panel */}
        <div className='login-image'>
          {/* <Link to='/' className='back-arrow'>←</Link> */}
        </div>

        {/* Right form panel */}
        <div className='login-form-panel'>

          <h1>GoBy Cosmetics , Smart Devices  & Beddings Online Shop </h1>
          <h2>Login</h2>

          <form className='login-form'>
            <input type="email" placeholder='Enter Your Email' />
            <input type="password" placeholder='Enter Your Passsword' />
            <button>Login</button>
          </form>

          <div className='Registerlink'>
            <h4>New Here ?   <Link to='/registerpage'>Register</Link></h4>
          </div>

          <h4><Link to="/HomePage">HomePage</Link></h4>

        </div>
      </div>
    </div>
  )
}

export default LoginPage