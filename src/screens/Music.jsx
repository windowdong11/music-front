import React, { useEffect, useState } from "react"
import ContentBody from "../components/ContentBody"
import SongInformation from "../components/music/SongInformation"
import axios from "axios"

let lastPageIdx = Infinity
const Music = ({ sortOption }) => {
    const [songs, setSongs] = useState([])
    const [pageIdx, setPageIdx] = useState(1)
    // TODO : pageIdx 범위 초과하는 경우 예외처리?
    const handlePrevButton = () => { if(0 < pageIdx) setPageIdx(pageIdx - 1) }
    const handleNextButton = () => { if(pageIdx < lastPageIdx) setPageIdx(pageIdx + 1) }

    useEffect(() => {
        axios
        .get(`https://api.pukuba.dev/api/v1/audio/main?page=${pageIdx ? pageIdx : 1}&filter=${sortOption ? sortOption : 'Latest'}`)
        .then((response) => {
            if(response.data.length === 0) {
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

    return <ContentBody Component={SongInformation} options={songs} onclickPrevBtn={handlePrevButton} onclickNextBtn={handleNextButton} />
}

export default Music
