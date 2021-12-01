import axios from "axios"

const getMainFolders = async(keyword="",sortOption = "LikeDesc",page = 1) => {
    let response
    try {
        response = await axios.get(`https://api.pukuba.dev/api/v1/folder/search`,{
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            params:{
                keyword,
                page,
                sort: sortOption
            }
        })
    } catch(e) {
        throw new Error(e.message)
    }

    return response.data
}