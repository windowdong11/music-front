import axios from "axios"

/**
 * @description 내가 올린 음원을 가져오는 함수
 */
const getMyAudios = async() => {
    let response
    try {
        response = await axios.get("https://api.pukuba.dev/api/v1/audio/my-audios",{
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