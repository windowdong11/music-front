import React, { useState, useEffect } from 'react'
import axios from 'axios'

const ResetPassword = () => {
    const [resetPassword, setResetPassword] = useState({verificationToken:'', password: ''})

    const PasswordHandleInput = (e) => {
      const { value } = e.target
      setResetPassword({...resetPassword, password: value })
    }

    const resetPasswordSubmit = async (e) => {
        e.preventDefault();
        await axios.patch('/v1/auth/reset-password', resetPassword, {
            headers: {Authorization: resetPassword.verificationToken}
        })
        .then(response => 
            {
              console.log(response.data)
            } 
        )
        .catch((err) => console.log(err.response.data))
    }

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken')
        if(accessToken){
            setResetPassword({
            ...resetPassword,
            verificationToken: accessToken
            })
        }
    }, [resetPassword])

    return (
        <div>
            <form onSubmit={resetPasswordSubmit}>
                <input placeholder="password"  value={resetPassword.password} onChange={PasswordHandleInput} />
                <input type="submit" value="reset password"/>
            </form>
        </div>
    )
}

export default ResetPassword
