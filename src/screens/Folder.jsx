import React, {useEffect, useState} from 'react'
import { Navigate } from 'react-router-dom'
import ContentBody from '../components/ContentBody'
import axios from 'axios'
import { ArrowForwardIosRounded, ArrowForwardRounded, ChevronRight, ChevronRightRounded, Favorite, FavoriteTwoTone } from '@mui/icons-material'
import Music from './Music';
import SongInformation from '../components/music/SongInformation'

//* ---------- Apis

const getMainFolders = async(keyword="",sortOption = "LikeDesc",page = 1) => {
    let response
    try {
        response = await axios.get(`https://api.pukuba.dev/api/v1/folder/search`,{
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            params:{
                keyword,
                page,
                sort: sortOption
            }
        })
    } catch(e) {
        throw new Error(e.message)
    }

    return response.data
}

const likeFolder = async(folderId) => {
    let response
    try {
        response = await axios.post(`https://api.pukuba.dev/api/v1/folder/like/${folderId}`, {}, {
            headers: {
                'Content-Type': "application/json",
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
            }
        })
    } catch(e) {
        throw new Error(e.message)
    }

    return response.data
}

const getFolderInfo = async(folderId) => {
    let response
    try {
        response = await axios.get(`https://api.pukuba.dev/api/v1/folder/${folderId}`,{
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
        })
    } catch(e) {
        throw new Error(e.message)
    }
    return response.data
}

//* ------------ Components

const FolderElement = (props) => {
    const {folderName, likes, likeStatus, folderId, handleLikeBtn, handleFolderInfoBtn} = props
    return (
        <li className="adobe-product" style={{cursor: 'auto'}}>
            <div className="products" style={{cursor: 'pointer'}} onClick={()=>handleFolderInfoBtn(folderId)}>
                <p>{folderName}</p>
            </div>
            <span className="status">
                <div className='button-wrapper'>
                <div className='btn' style={{padding: '8px'}} onClick={()=>handleLikeBtn(folderId)}>
                {likeStatus ? <Favorite/> : <FavoriteTwoTone/>}
                </div>
                {likes} likes
                </div>
            </span>
            <div className="button-wrapper">
                <div className='btn' onClick={() => handleFolderInfoBtn(folderId)}>
                    <ChevronRightRounded style={{fontSize: '40px'}}/>
                </div>
            </div>
        </li>
    )
}

const FolderLists = () => {
    const [isFolderView, setIsFolderView] = useState(true)
    const [musics, setMusics] = useState([]);
    const [folders, setFolders] = useState([]);
    const [isLoading, setLoading] = useState(false);
    useEffect(()=>{
        getMainFolders()
        .then(res => {
            setFolders(res.data)
            setLoading(false)
        })
        setLoading(true);
    }, [])
    const handleLikeBtn = (folderId) => {
        likeFolder(folderId).then(() => {
            setFolders(lastfolders => 
                lastfolders.map(folder => {
                if(folder.folderId === folderId)
                    return {...folder, likeStatus : !folder.likeStatus, likes: folder.likeStatus ? folder.likes - 1 : folder.likes + 1};
                return folder
                })
            )
        })
    }

    const handleFolderInfoBtn = (folderId) => {
        getFolderInfo(folderId).then(res =>{
            setIsFolderView(false);
            setMusics(res.audioList);
            setLoading(false);
        })
        setLoading(true);
    }

    const handlePrevBtn = () => {
        setIsFolderView(true);
    }
    if(isLoading) return <div>Loading...</div>
    if(!isFolderView) return <ContentBody Component={SongInformation} options={musics.map(music => {return {
        "audioId": music.audioId,
        "title": music.audioTitle,
        "views": music.audioViews,
        "duration": music.audioDuration,
        "filter": music.audioFilter,
        "url": music.audioUrl,
        "userId": music.userId
    }})} onclickPrevBtn={handlePrevBtn}  />
    if(folders.length === 0) return <div>폴더가 없습니다.</div>
    return <ContentBody Component={FolderElement} options={folders.map(folder => {return {...folder, handleLikeBtn, handleFolderInfoBtn}})}/>
}

const FolderAuth = ()=>{
    if(!localStorage.getItem('token')) return <Navigate to="/signin"/>
    return <FolderLists/>
}


export default FolderAuth
