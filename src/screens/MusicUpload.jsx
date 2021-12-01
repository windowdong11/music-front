import React from "react";
import ContentBody from "../components/ContentBody";
import axios from "axios";
import uploadAudio from "../apis/uploadAudio";
import { useAuth } from "../hooks/Auth";
import { useNavigate } from "react-router-dom";


            
const musicFilters = ["Default", "NightCore", "NoiseFilter", "Stereo"]
const MusicUpload = () => {
    const [url, setURL] = React.useState('');
    const [musicFilter, setMusicFilter] = React.useState('Default');
    const [musicName, setMusicName] = React.useState('');
    const auth = useAuth()
    const navigator = useNavigate()
    const handleUpload = async () => {
        if(auth.isSignedOut()) navigator('/signin')
        try {
            const result = await uploadAudio(url, musicFilter, musicName)
            console.log(result)
        } catch(e) {
            console.log(e.response)
        }
    }
    return (
        <div className="content-section">
            <div className="content-section-title">Upload Music!</div>
            <ul>
                <li className="adobe-product">
                    <div className="products short">Music Name</div>
                    <input type="text" value={musicName} onChange={(e) => setMusicName(e.target.value)} placeholder="music name"></input>
                    <div className="button-wrapper">
                        <button
                            className="content-button status-button open"
                            onClick={handleUpload}
                        >
                        Upload
                        </button>
                    </div>
                </li>
                <li className="adobe-product">
                    <div className="products short">URL</div>
                    <input type='url' value={url} onChange={e => setURL(e.target.value)} placeholder="URL here"></input>
                </li>
                <li className="adobe-product">
                    <div className="products short">Music Filters</div>
                    {musicFilters.map((filter, index) => 
                    <div>
                        <input type="radio" name='music-filters' key={index} id={filter}
                        style={{marginRight: "5px"}}
                        value={filter} checked={musicFilter === filter}
                        onChange={(e) => setMusicFilter(e.target.value)}/>
                        <label htmlFor={filter}
                        style={{marginRight: "8px"}}
                        ><i>{filter}</i></label>
                    </div>
                    )}
                </li>
            </ul>
        </div>
    )
}

export default MusicUpload;