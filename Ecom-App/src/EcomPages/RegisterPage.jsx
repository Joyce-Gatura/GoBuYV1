import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/register.css'

const RegisterPage = () => {
  return (
    <div className='registerpage'>

          {/* <h2  >Click $ Shop</h2> */}
      <div className='register-card'>


        {/* Left image panel */}
        <div className='register-image'>
          {/* <Link to='/' className='back-arrow'></Link> */}
        </div>

        {/* Right form panel */}
        <div className='register-form-panel'>

          <div className='register-header'>
           
            <div>
              <h1>GoBy Cosmetics , Smart Devices  & Interior Décors  </h1>

              <h2>Register</h2>
            </div>
          </div>

          <form className='register-form'>

            <div className='name-row'>
              <div className='form-group'>
                <label>First name</label>
                <input type='text' placeholder='Enter your first name' />
              </div>
              <div className='form-group'>
                <label>Last name</label>
                <input type='text' placeholder='Enter your last name' />
              </div>
            </div>

            <div className='form-group'>
              <label>Email</label>
              <input type='email' placeholder='Enter your email' />
            </div>

            <div className='form-group'>
              <label>Password</label>
              <input type='password' placeholder='Create your password' />
            </div>
             <div className='form-group'>
              <label> Confirm Password</label>
              <input type='password' placeholder='Confirm your password' />
            </div>

            <button type='submit' className='register-btn'>
              Register
            </button>
            <div className='Loginlink'>
              <h4>Already have an account? <Link to='/LoginPage'>Log in</Link></h4>
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage