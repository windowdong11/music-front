import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './information.css'

import valid from '../../utils/valid'

const SignInUpForm = () => {
  const [userInput, setUserInput] = useState({
    email: '',
    password: '',
    username: '',
  })
  const [isFirstMenu, setIsFirstMenu] = useState(true)
  const [emailVerified, setemailVerified] = useState(false)
  const handleSignIn = async (e) => {}
  const handleSignUp = async (e) => {}
  const handleVerifyEmail = async (e) => {}
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setUserInput({ ...userInput, [name]: value })
  }
  return (
    <div className="Information">
      {isFirstMenu ? (
        <>
          <div className="main">
            <div className="top">
              <span>Sign In</span>
            </div>
            <form onSubmit={handleSignIn}>
              <div className="middle">
                <div className="inputbox">
                  <label for="email">Enter your email</label>
                  <input id="email" type="email" name="email" placeholder="email" value={userInput.email} onChange={handleInputChange} />
                </div>
                <div className="inputbox">
                  <label htmlFor="password">password</label>
                  <input id="password" type="password" name="password" placeholder="password" value={userInput.password} onChange={handleInputChange} />
                </div>
                <div className="check">
                  <a href="#">Find email</a>
                  <a href="#">Forgot your password?</a>
                </div>
              </div>
              <button type="submit">Sign In</button>
            </form>
          </div>
          <div className="side">
            <span>Hello, Friend!</span>
            <div className="line"></div>
            <p>Fill up personal information and <br />start journey with us</p>
            <Link to="/signup">Sign Up</Link>
          </div>
        </>
      ) : (
        <>
          <div className="side">
            <span>Sign In</span>
            <div className="line"></div>
            <p>This website is much better when you have an account <br /> Get yourself one</p>
            <Link to="/signin">Sign In</Link>
          </div>
          <div className="main">
            <div className="top">
              <span>Sign Up</span>
            </div>
            <form onSubmit={handleSignUp}>
              <div className="middle">
                <div className="inputbox">
                  <label htmlFor="username">Username</label>
                  <input id="username" type="text" name="username" placeholder="username" value={userInput.username} onChange={handleInputChange} />
                </div>
                <div className="inputbox">
                  <label for="email">Enter your email</label>
                  <input id="email" type="email" name="email" placeholder="email" value={userInput.email} onChange={handleInputChange} />
                </div>
                <div className="inputbox">
                  <label htmlFor="password">Set a password</label>
                  <input id="password" type="password" name="password" placeholder="password" value={userInput.password} onChange={handleInputChange} />
                </div>
              </div>
              {
                emailVerified ? 
                  <button onClick={handleVerifyEmail}>Verify Email</button>
                  : <button type="submit" disabled={emailVerified}>Sign Up</button>
              }
            </form>
          </div>
        </>
      )}
    </div>
  )
}

export default SignInUpForm


{/* <form onSubmit={verificationSubmit}>
<div className='middle'>
  <div className="inputbox">
    <label htmlFor="verification">verification</label>
    <input id="verification" type="text" name="verificationToken" placeholder="verification code" value={verifiCode} onChange={verifiCodeInput} />
  </div>
</div>
<button type="submit">verification</button>
</form> */}