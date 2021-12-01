import React,{ useState, useEffect } from 'react'
import axios from 'axios'

const Folder = () => {
  const [accessToken, setAccessToken] = useState('')
  const [folderName, setFolderName] = useState({folderName: ''})

  const folderNameInput = (e) => {
    const {name, value} = e.target
    setFolderName({...folderName, folderName:value })
  }

  const createFolder = async (e) => {
    e.preventDefault()
    const config = {
      headers: {
        Authorization: `bearer ${accessToken}`,
      }
    }
    await axios.post('/v1/folder',folderName, config)
    .then(response => console.log(response.data.message)
    )
    .catch((err) => console.log(err.response.data))
  }

  useEffect(()=> {
    const token = localStorage.getItem('accessToken')
    if(token) setAccessToken(token)
  },[accessToken])

  return (
    <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
      <input type="text" name="folderName" placeholder="folder name" value={folderName.folderName} onChange={folderNameInput} />
      <input type="button" onClick={createFolder} value="Create a folder."/>
    </div>
  )
} 

export default Folder 