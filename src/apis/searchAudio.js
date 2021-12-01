import axios from "axios"

/**
 * 음원 검색하기 검색은 정확도순
 * @param {string} keyword 키워드
 */
export const searchAudio = async (keyword, page = 1) => {
    let response
    try {
        response = await axios.get(`https://api.pukuba.dev/api/v1/audio/search`, {
            headers: {
                "Content-Type": "application/json",
                Authroization: `Bearer ${localStorage.getItem("token")}`,
            },
            params: {
                keyword: keyword,
                page: page,
            },
        })
    } catch (e) {
        throw new Error(e.message)
    }

    return response.data
}
