import axios from "axios"


/**
 * @description 폴더의 정보를 가져오는 함수
 * @param {string} folderId 폴더의 id
 * @param {number} page 페이지
 */
const getFolderInfo = async(folderId,page = 1) => {
    let response
    try {
        response = await axios.get(`https://api.pukuba.dev/api/v1/folder/${folderId}`,{
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