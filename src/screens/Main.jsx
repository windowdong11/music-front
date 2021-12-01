import React,{ useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Main = () => {
    const [accessToken, setAccessToken] = useState('')
    const [userId, setUserId] = useState('')

    useEffect(()=> {
        const token = localStorage.getItem('accessToken')
        if(token) setAccessToken(token)
    },[accessToken])

    const logout = async (e) => {
        e.preventDefault()
        const config = {
            headers: {
              Authorization: `bearer ${accessToken}`,
            }
        }
        await axios.delete('/v1/auth/sign-out', config)
        .then(response => {
            console.log(response.data)
            localStorage.removeItem('accessToken')
            localStorage.removeItem('email')
            window.location.href = '/'
        })
        .catch((err) => console.log(err.response.data))
    }
    return (
        <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
            main
            <Link to='/signin'>signin</Link>
            <Link to='/signup'>signup</Link>
            <Link to='/reset_password'>reset_password</Link>
            <Link to='/folder'>folder</Link>
            <Link to='/audio'>audio</Link>
            <input type="button" value='logout' onClick={logout} />
        </div>
    )
}

export default Main