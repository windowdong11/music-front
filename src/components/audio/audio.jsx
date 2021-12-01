import React,{ useState, useEffect } from 'react'
import axios from 'axios'
import './audio.css'

const Audio = () => {
  const [accessToken, setAccessToken] = useState('')
  const [audioName, setaudioName] = useState({audioName: ''})

  const audioNameInput = (e) => {
    const {name, value} = e.target
    setaudioName({...audioName, audioName:value })
  }

  const createFolder = async (e) => {
    const config = {
      headers: {
        Authorization: accessToken,
      }
    }
    e.preventDefault()
    await axios.post('https://api.pukuba.dev/api/v1/audio',audioName, config)
    .then(response => console.log(response.data)
    )
    .catch((err) => console.log(err.response.data))
  }

  useEffect(()=> {
    const token = localStorage.getItem('accessToken')
    if(token) setAccessToken(token)
    console.log(accessToken)
  },[accessToken])

    return (
      <form style={{display:'flex'}} onSubmit={createFolder}>
      <input type="text" name="audioName" placeholder="audio name" value={audioName.audioName} onChange={audioNameInput} />
      <input type="audio" />
    </form>
    )
} 

export default Audio
