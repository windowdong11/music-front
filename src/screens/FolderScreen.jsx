import React,{ useState, useEffect } from 'react'
import CreateFolder from '../components/folder/CreateFolder'
import EditFolder from '../components/folder/EditFolder'
import FolderList from '../components/folder/FolderList'

const Foldersetting = ()=>{
    const [accessToken, setAccessToken] = useState('')
    const [userId, setUserId] = useState('')

    useEffect(()=> {
        const token = localStorage.getItem('accessToken')
        if(token) setAccessToken(token)
    },[accessToken])

    useEffect(()=> {
        const email = localStorage.getItem('email')
        if(email) setUserId(email)
    },[userId])
    return(
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <CreateFolder accessToken={accessToken} />
            {/*<EditFolder accessToken={accessToken} config={config} />*/}
            <FolderList accessToken={accessToken} userId={userId} />
        </div>
    )
}

export default Foldersetting
