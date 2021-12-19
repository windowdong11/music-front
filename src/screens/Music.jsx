import React, { useEffect, useState } from "react"
import ContentBody from "../components/ContentBody"
import SongInformation from "../components/music/SongInformation"
import axios from "axios"
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { FormControl, MenuItem, Select } from "@mui/material";
import Button from '@mui/material/Button';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const addAudioToFolder = async (folderId, audioId) => {
  let response
  try {
    response = await axios.post(`https://api.pukuba.dev/api/v1/folder/${folderId}/${audioId}`, {}, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
    })
  } catch (e) {
    throw new Error(e.message)
  }
  return response.data
}

const getMyFolders = async () => {
  let response
  try {
    response = await axios.get(`https://api.pukuba.dev/api/v1/folder/search?page=1&sort=DateLatest&creator=${localStorage.getItem('email')}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
    })
  } catch (e) {
    throw new Error(e.message)
  }
  return response.data
}

const AddToFolderModal = ({ open, handleClose, audioId }) => {
  const [myFolders, setMyFolders] = useState([])
  const [myFolder, setMyFolder] = useState('')
  useEffect(() => {
    getMyFolders().then(res => {
      setMyFolders(res.data)
    })
  }, [])

  const handleAddToFolder = () => {
    if(myFolder === '') return
    addAudioToFolder(myFolders[myFolder].folderId, audioId)
      .then(res => {
        handleClose()
      })
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box sx={{ ...style, width: 400 }}>
        <h2 id="parent-modal-title">폴더에 추가</h2>
        <FormControl sx={{ m: 1, minWidth: 200 }}>
          <Select autoWidth
            value={myFolder}
            onChange={e => setMyFolder(e.target.value)}>
              <MenuItem value=''>Select Folder</MenuItem>
            {myFolders.map((folder, idx) =>
              <MenuItem value={idx} key={idx}>{folder.folderName}</MenuItem>
            )}
          </Select>
        <Button variant='contained' onClick={handleAddToFolder}>Add to folder</Button>
        </FormControl>
        {/* <p id="parent-modal-description">{audioId} 내 폴더 리스트 선택창</p> */}
      </Box>
    </Modal>
  )
}

let lastPageIdx = Infinity
const Music = ({ sortOption }) => {
  const navigator = useNavigate()
  const [open, setOpen] = useState(false)
  const [activeAudioId, setActiveAudioId] = useState(null)
  const handleOpen = (audioId) => {
    if (!localStorage.getItem('token')) navigator('/signin')
    setActiveAudioId(audioId)
    setOpen(true)
  }
  const handleClose = () => { setOpen(false) }

  const [songs, setSongs] = useState([])
  const [pageIdx, setPageIdx] = useState(1)
  // TODO : pageIdx 범위 초과하는 경우 예외처리?
  const handlePrevButton = () => { if (0 < pageIdx) setPageIdx(pageIdx - 1) }
  const handleNextButton = () => { if (pageIdx < lastPageIdx) setPageIdx(pageIdx + 1) }

  useEffect(() => {
    axios
      .get(`https://api.pukuba.dev/api/v1/audio/main?page=${pageIdx ? pageIdx : 1}&filter=${sortOption ? sortOption : 'Latest'}`)
      .then((response) => {
        if (response.data.length === 0) {
          lastPageIdx = pageIdx
          return;
        }
        setSongs(
          response.data.data.map((song) => {
            return {
              title: song.title,
              views: song.views,
              duration: song.duration,
              url: song.url,
              audioId: song.audioId,
              userId: song.userId,
              filter: song.filter,
            }
          })
        )
      })
      .catch((err) => console.log(err))
  }, [pageIdx, sortOption])

  return (
    <div>
      <AddToFolderModal open={open} handleClose={handleClose} audioId={activeAudioId} />
      <ContentBody Component={SongInformation} options={songs.map(song => { return { ...song, handleAddToFolderBtn: handleOpen } })} onclickPrevBtn={handlePrevButton} onclickNextBtn={handleNextButton} />
    </div>
  )
}

export default Music
