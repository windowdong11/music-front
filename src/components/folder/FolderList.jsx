import React,{ useState, useEffect } from 'react'
import axios from 'axios'

const FolderList = ({accessToken, userId}) => {
    const [folderName, setFolderName] = useState({folderName: ''})
    const [folderData, setFolderData] = useState([])

    const handleInput = (e, id) => {
        const {value} = e.target
        setFolderData((data) => 
        data.map((list, index) =>
        index === id ? {...list, folderName: value} : list))
    }

    const patchFolderName = (id) => async (e) => {
        e.preventDefault()
        const config = {
            headers: {
              Authorization: `bearer ${accessToken}`,
            }
        }
        await axios.patch(`/v1/folder/${id}`, folderName, config)
        .then(response => {
            console.log(response.data)
            window.location.reload(false)
        })
        .catch((err) => console.log(err.response.data))
    }

    const deleteFolder = (id) => async (e) => {
        e.preventDefault()
        const config = {
            headers: {
              Authorization: `bearer ${accessToken}`,
            }
        }
        await axios.delete(`/v1/folder/${id}`, config)
        .then(response => {
            console.log(response.data)
            window.location.reload(false)
        })
        .catch((err) => console.log(err.response.data))
    }

    useEffect(()=> {
        const getFolder = async () => {
            const config = {
                headers: {
                  Authorization: `bearer ${accessToken}`,
                },
                params: {
                    creator: userId
                }
            }
            await axios.get(`/v1/folder/search`, config)
            .then(response => {
                    setFolderData(response.data.data)
                    console.log(response.data)
                }
            )
            .catch((err) => console.log(err.response.data))
        }
        getFolder() 
    },[accessToken])

    return (
        <div>
            {folderData.map((data, index) => ( // 버튼: 폴더 삭제, 폴더 이름 변경/ 작성자, 폴더명, 좋아요 수
                <div key={index} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '500px', border: 'solid #000 1px', padding: '10px', margin: '20px 0'}}>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <span style={{fontWeight: 'bold', fontSize: '24px'}}>{data.folderName}</span>
                        <input type="text" value={data.folderName} onChange={(e) => handleInput(e, index)} />
                        <span style={{fontSize: '14px'}}>{data.creator}</span>
                        <span style={{fontSize: '14px'}}>좋아요{data.likes}</span>
                    </div>
                    <div>
                        <button type="button" onClick={deleteFolder(data._id)} style={{width: '100px', height: '40px', backgroundColor: '#fff', color: '#f00', border: 'solid 1px #f00', cursor: 'pointer'}}>delete</button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default FolderList
