import axios from "axios"


/**
 * @description 음원을 폴더안에 업로드하는 함수
 * @param {string} folderId 폴더 아이디
 * @param {string} audio 음원 아이디
 */
const addAudioInFolder = async(folderId,audioId) => {
    let response
    try {
        response = await axios.post(`https://api.pukuba.dev/api/v1/folder/${folderId}/${audioId}`,{
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