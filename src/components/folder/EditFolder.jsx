import React,{ useState, useEffect } from 'react'
import axios from 'axios'



const EditFolder = ({accessToken, config})=>{
    const [folderName, setFolderName] = useState({folderName: ''})

    const folderNameInput = (e) => {
        const {value} = e.target
        setFolderName({...folderName, folderName:value })
    }
    
    const changeFolderName = async (e) => {
        e.preventDefault()
        await axios.patch(`/v1/folder/`,folderName, config)
        .then(response => console.log(response.data.message)
        )
        .catch((err) => console.log(err.response.data))
      }

    useEffect(()=> {
        const getFolder = async () => {
            await axios.get(`/v1/folder/`, config)
            .then(response => console.log(response.data)
            )
            .catch((err) => console.log(err.response.data))
        }
        getFolder() 
    },[accessToken])


    return(
        <div>
            <input type="text" name="folderName" placeholder="folder name" value={folderName.folderName} onChange={folderNameInput} />
            <input type="button" onClick={changeFolderName} value="Chnage a folder"/>
        </div>
    )
        
    
}

export default EditFolder
