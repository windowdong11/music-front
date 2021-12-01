import React, { useEffect, useState } from "react"
import ContentBody from "../components/ContentBody"
import SongInformation from "../components/music/SongInformation"
import axios from "axios"

export default ({ sortOption }) => {
    const [songs, setSongs] = useState([])
    
    const handlePrevButton = () => {}
    const handleNextButton = () => {}
    useEffect(() => {
        axios
            .get("https://api.pukuba.dev/api/v1/audio/random")
            .then((response) => {
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
            .catch((err) => console.log(err.response.data))
    }, [])
    return <ContentBody Component={SongInformation} options={songs} onclickPrevBtn={handlePrevButton} onclickNextBtn={handleNextButton}/>
}
