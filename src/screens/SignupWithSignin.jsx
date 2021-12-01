import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate, Navigate } from 'react-router-dom'
import axios from 'axios'
import './information.css'
import { validUsername, validPassword, validEmail } from '../utils/valid'
import { useProvideAuth } from '../hooks/Auth'
const SignupWithSignin = () => {
  const [errorMsg, setErrorMsg] = useState('')
  const [isVerified, setIsVerified] = useState(false)
  const [isCodeSent, setIsCodeSent] = useState(false)
  const [userInput, setUserInput] = useState({
    email: '',
    password: '',
    username: '',
    verificationCode: '',
    verificationToken: '',
  })
  const handleInputChange = (e) => {
    const { name, value } = e.target
    if (name === 'email') {
      setUserInput({ ...userInput, [name]: value, verificationToken: '' })
      setIsVerified(false)
    }
    else setUserInput({ ...userInput, [name]: value })
  }
  const [isFirstMenu, setIsFirstMenu] = useState(useLocation().pathname === '/signin')
  const auth = useProvideAuth();
  const navigator = useNavigate()
  const handleSignIn = (e) => {
    e.preventDefault()
    const { email, password } = userInput
    auth.signin(() => {navigator('/')}, email, password)
    // axios.post('/v1/auth/sign-in', { email, password })
    //   .then(res => {
    //     localStorage.setItem('email', email)
    //     localStorage.setItem('accessToken', res.data.accessToken)
    //     navigator('/')
    //   })
    //   .catch(err => { console.log(err) })
  }
  const handleSignUp = async (e) => {
    // * 회원가입 요청
    e.preventDefault()
    const { email, password, username, verificationToken } = userInput
    if (!isVerified) return alert('이메일 인증을 해주세요')
    else if (!validEmail(email)) return alert('이메일 형식이 올바르지 않습니다.')
    else if (!validPassword(password)) return alert('비밀번호는 6자 이상 40자 이하이며 하나 이상의 숫자 및 문자, 특수문자가 필요합니다.')
    else if (!validUsername(username)) return alert('기준을 모르니 생략') // ! 비밀번호 기준
    axios.post('/v1/auth/sign-up', { email, password, username, verificationToken })
    .then(res => {
      if (res.status === 201) {
        alert('회원가입이 완료되었습니다.')
        window.location.href = '/signin'
      }
    })
    .catch(err => {
      setErrorMsg(err.response.data.message)
    })
  }
  const sendVerificationCode = async (e) => {
    e.preventDefault()
    // * 이메일 인증 코드 전송
    const { email } = userInput
    if (!validEmail(email)) return alert('이메일 형식이 올바르지 않습니다.')
    const res = await axios.post('/v1/auth/code', { email })
    console.log(res)
    if (res.status === 201)
    setIsCodeSent(true)
  }
  const handleVerifyCode = async (e) => {
    // * 이메일 인증 키 확인
    e.preventDefault()
    const { email, verificationCode } = userInput
    if (!validEmail(email)) return alert('이메일 형식이 올바르지 않습니다.')
    else if (verificationCode === '') return alert('인증 코드를 입력해주세요.')
    const res = await axios.get('/v1/auth/code', { params: { email, verificationCode } })
    if (res.status === 200) {
      setUserInput({ ...userInput, verificationToken: res.data.verificationToken })
      setIsVerified(true)
    }
  }
  return (
    <div className="Information">
      { auth.isSignedIn() ?
      <Navigate replace to='/'/>
      :isFirstMenu ? (
        <>
          <div className="main">
            <div className="top">
              <span>Sign In</span>
            </div>
            <form onSubmit={handleSignIn}>
              <div className="middle">
                <div className="inputbox">
                  <label htmlFor="email">Enter your email</label>
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
            <Link to="/signup" onClick={() => setIsFirstMenu(!isFirstMenu)}>Sign Up</Link>
          </div>
        </>
      ) : (
        <>
          <div className="side">
            <span>Sign In</span>
            <div className="line"></div>
            <p>This website is much better when you have an account <br /> Get yourself one</p>
            <Link to="/signin" onClick={() => setIsFirstMenu(!isFirstMenu)}>Sign In</Link>
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
                  <label htmlFor="email">Enter your email</label>
                  <input id="email" type="email" name="email" placeholder="email" value={userInput.email} onChange={handleInputChange} />
                </div>
                <div className="inputbox">
                  <label htmlFor="password">Set a password</label>
                  <input id="password" type="password" name="password" placeholder="password" value={userInput.password} onChange={handleInputChange} />
                </div>
                <div className="inputbox verifycode">
                  <label htmlFor="password">Verify code</label>
                  <input id="verifycode" type="text" name="verificationCode" placeholder="verifycode" value={userInput.verificationCode} onChange={handleInputChange} />
                  <p>
                    {
                    isVerified ?  'Email Verified!' :
                      isCodeSent ?  'Check your email!' :
                        'Send verification code'
                    }
                  </p>
                  <div className="button-box">
                    <button onClick={sendVerificationCode}>Send verification code</button>
                    <button onClick={handleVerifyCode} >Verify code</button>
                  </div>
                </div>
                <div className="check">
                  {errorMsg !== '' ? <div>{errorMsg}</div> : null}
                </div>
              </div>
              <button type="submit">Sign Up</button>
            </form>
          </div>
        </>
      )}
    </div>
  )
}

export default SignupWithSignin


{/* <form onSubmit={verificationSubmit}>
<div className='middle'>
  <div className="inputbox">
    <label htmlFor="verification">verification</label>
    <input id="verification" type="text" name="verificationToken" placeholder="verification code" value={verifiCode} onChange={verifiCodeInput} />
  </div>
</div>
<button type="submit">verification</button>
</form> */}