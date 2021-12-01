import axios from "axios"

/**
 * 음원 정보 검색하기
 * @param {string} audioId 오디오 아이디
 */
export const getAudio = async(audioId) => {
    let response
    try {
        response = await axios.get(`https://api.pukuba.dev/api/v1/audio/${audioId}`,{
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
    } catch(e) {
        throw new Error(e.message)
    }

    return response.data
}