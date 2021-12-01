import Swal from "sweetalert2"

export const infoModal = ({ title, views, url, audioId, duration, userId, filter }) => {
    Swal.fire({
        title: `${title}`,
        html: `
        Title: ${title} <br>
        Views: ${views} <br>
        CDN: ${url} <br>
        Audio Id: ${audioId} <br>
        Duration: ${duration} <br>
        Uploader Id: ${userId.split("@")[0]} <br>
        Filter: ${filter} <br>
        `,
    })
}
