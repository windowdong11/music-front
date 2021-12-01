import axios from "axios"



const isValidFilter = (filter) => {
    const filters = ["Default", "NightCore", "NoiseFilter", "Stereo"]
    return filters.includes(filter)
}

/**
 * @param {string} youtubeLink 음원의 유튜브 주소 
 * @param {string} filter 정제 옵션 Default | NightCore | NoiseFilter | Stereo
 * @param {string} name 음원이 이름 undefined면 자동으로 유튜브 타이틀이 됨
 */
const uploadAudio = async( youtubeLink, filter = "Default", name) => {

    if(!isValidFilter(filter)){
        throw new Error("필터가 올바르지 않습니다")
    }

    const data = {
        youtubeLink,
        filter,
        name
    }
    let response
    console.log(data)
        console.log(localStorage.getItem("token"))
        
    try {
        response = await axios("https://api.pukuba.dev/api/v1/audio/link",{
            method:"POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            data
        })
    } catch(e) {
        throw new Error(e.message)
    }
    return response.data
}

export default uploadAudio