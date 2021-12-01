import React,{ useState, useEffect } from 'react'
import axios from 'axios'

const CreateFolder = ({accessToken}) => {
  const [folderName, setFolderName] = useState({folderName: ''})

  const config = {
    headers: {
      Authorization: `bearer ${accessToken}`,
    }
  }

  const folderNameInput = (e) => {
    const {name, value} = e.target
    setFolderName({...folderName, folderName:value })
  }

  const createFolder = async (e) => {
    e.preventDefault()
    await axios.post('/v1/folder',folderName, config)
    .then(response => {
      console.log(response.data)
      window.location.reload(false)
    }
    )
    .catch((err) => console.log(err.response.data))
  }

  return (
    <form style={{display:'flex'}} onSubmit={createFolder}>
      <input type="text" name="folderName" placeholder="folder name" value={folderName.folderName} onChange={folderNameInput} />
      <input type="submit" value="Create a folder"/>
    </form>
  )
} 

export default CreateFolder 
