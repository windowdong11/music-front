import React, { useEffect, useState } from "react"
import ContentBody from "../components/ContentBody"
import SongInformation from "../components/music/SongInformation"
import axios from "axios"

const getSong = async (query, callback) => {
    const {pageIdx, sortOption: filter} = query
    return axios
        .get(`https://api.pukuba.dev/api/v1/audio/main?page=${pageIdx ? pageIdx : 1}&filter=${filter ? filter : 'Latest'}`)
        .then((response) => {
            callback(response.data)
        })
        .catch((err) => console.log(err.response.data))
}
let lastPageIdx = Infinity
export default ({ sortOption }) => {
    const [songs, setSongs] = useState([])
    const [pageIdx, setPageIdx] = useState(1)
    // TODO : pageIdx 범위 초과하는 경우 예외처리?
    const handlePrevButton = () => { if(0 < pageIdx) setPageIdx(pageIdx - 1) }
    const handleNextButton = () => { if(pageIdx < lastPageIdx) setPageIdx(pageIdx + 1) }
    useEffect(() => {
        getSong({pageIdx, sortOption},
            (response) => {
                if(response.data.length === 0) {
                    lastPageIdx = pageIdx
                    return;
                }
                setSongs(
                    response.data.map((song) => {
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
    }, [pageIdx, sortOption])
    return <ContentBody Component={SongInformation} options={songs} onclickPrevBtn={handlePrevButton} onclickNextBtn={handleNextButton} />
}
