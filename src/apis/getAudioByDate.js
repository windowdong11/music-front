import axios from "axios"

/**
 * 어떠한 기준으로 음원 가져오기
 * @param {number} page 페이지
 */
export const getAudioByDate = async (page = 1) => {
    let response
    try {
        response = await axios.get(`https://api.pukuba.dev/api/v1/audio/main`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            params: {
                page: page,
                filter: "Latest",
            },
        })
    } catch (e) {
        throw new Error(e.message)
    }

    return response.data
}
