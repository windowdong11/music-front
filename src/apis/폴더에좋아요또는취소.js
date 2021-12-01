import axios from "axios"

/**
 * 좋아요 또는 취소
 * @param {string} folderId 폴더 아이디
 */
const likeFolder = async(folderId) => {
    let response
    try {
        response = await axios.post(`https://api.pukuba.dev/api/v1/folder/like/${folderId}`,{
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