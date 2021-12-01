import JSZip from "jszip"
import { saveAs } from "file-saver"
const blobfetch = async ({ url, method, data }) => {
    let option = {
        method: method,
        credential: "omit",
        body: data,
    }

    let result = await fetch(url, option)
    return result.blob()
}

let zip = new JSZip()

export const folderDownload = async (list, folderName) => {
    for (const i in list) {
        let file = blobfetch({
            url: `${i.url}`,
            method: "GET",
        })
        zip.file(`${list[i].title}.mp3`, file)
    }
    await zip.generateAsync({ type: "blob" }).then(function (content) {
        saveAs(content, folderName + ".zip")
    })
}

export const download = async (dataurl, filename) => {
    await fetch(dataurl, {
        headers: {
            "Content-Type": "application/octet-stream",
        },
        responseType: "blob",
    })
        .then((response) => response.blob())
        .then((blob) => saveAs(blob, filename))
}
