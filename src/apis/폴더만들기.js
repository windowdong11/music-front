import axios from "axios"

/**
 * @description 폴더 만들기
 * @param {string} folderName 폴더명
 */
const uploadNewFolder = async(folderName) => {
    let response
    try {
        response = await axios.post("https://api.pukuba.dev/api/v1/folder",{
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            data: {
                folderName
            }
        })
    } catch(e) {
        throw new Error(e.message)
    }
    return response.data
}