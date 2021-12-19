import React, { useCallback, useRef, useState } from "react"
import { download } from "../../utils/download"
import { getAudio } from "../../apis/getAudio"
import { infoModal } from "../../utils/modal"
// TODO: 메뉴 - 드롭다운에 링크 추가

let audio = undefined
let audioCtx = undefined

const updateViews = (title, views) => {
  for (const item of document.getElementsByClassName("adobe-product")) {
    const text = item.getElementsByClassName("products")[0].innerText
    if (text === title) {
      const nd = document.createElement("span")
      nd.className = "status-circle green"
      item.getElementsByClassName("status")[0].innerText = views + " views"
      item.getElementsByClassName("status")[0].appendChild(nd)
      break
    }
  }
}

const setVisualizer = () => {
  audioCtx = new AudioContext()
  audio.crossOrigin = "anonymous"
  let source = audioCtx.createMediaElementSource(audio)
  let analyser = audioCtx.createAnalyser()

  source.connect(analyser)
  analyser.connect(audioCtx.destination)
  analyser.fftSize = 256

  let bufferLength = analyser.frequencyBinCount
  let dataArray = new Uint8Array(bufferLength)

  let canvas = document.getElementById("canvas")
  canvas.width = 400
  canvas.height = 150
  let ctx = canvas.getContext("2d")
  let WIDTH = canvas.width
  let HEIGHT = canvas.height
  let barWidth = (WIDTH / bufferLength) * 2.5
  let barHeight
  let x = 0

  function renderFrame() {
    requestAnimationFrame(renderFrame)
    x = 0
    analyser.getByteFrequencyData(dataArray)
    ctx.fillStyle = "#000"
    ctx.fillRect(0, 0, WIDTH, HEIGHT)
    for (let i = 0; i < bufferLength; i++) {
      barHeight = dataArray[i] / 2

      let r = barHeight + 25 * (i / bufferLength)
      let g = 250 * (i / bufferLength)
      let b = 50
      ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")"
      ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight)
      x += barWidth + 1
    }
  }

  renderFrame()
}

const audioSet = async (url, title, audioId) => {
  const res = await getAudio(audioId)
  updateViews(title, res.views)
  const audioPlayer = document.querySelector(".audio-player")
  document.getElementsByClassName("img-content")[0].innerText = title
  audioPlayer.getElementsByClassName("name")[0].innerText = title

  const dlbtn = document.querySelector(
    "#root > div > div.app > div.wrapper > div.main-container > div > div.content-wrapper-header > div > button"
  )
  dlbtn.onclick = () => download(url, `${title}.mp3`)

  if (audio === undefined) {
    audio = new Audio()
    audio.src = url
    const playBtn = audioPlayer.querySelector(".controls .toggle-play")
    playBtn.classList.remove("play")
    playBtn.classList.remove("pause")
    playBtn.classList.add("pause")
    playBtn.addEventListener(
      "click",
      () => {
        if (audio.paused) {
          playBtn.classList.remove("play")
          playBtn.classList.add("pause")
          audio.play()
        } else {
          playBtn.classList.remove("pause")
          playBtn.classList.add("play")
          audio.pause()
        }
      },
      false
    )
  } else {
    audio.pause()
    audio = null
    audio = new Audio()
    audio.src = url
  }
  audio.play()
  setVisualizer()

  const playBtn = audioPlayer.querySelector(".controls .toggle-play")
  playBtn.classList.remove("play")
  playBtn.classList.remove("pause")
  playBtn.classList.add("pause")
  //credit for song: Adrian kreativaweb@gmail.com

  console.dir(audio)

  audio.addEventListener(
    "loadeddata",
    () => {
      audioPlayer.querySelector(".time .length").textContent = getTimeCodeFromNum(
        audio.duration
      )
      audio.volume = 0.75
    },
    false
  )

  //click on timeline to skip around
  const timeline = audioPlayer.querySelector(".timeline")
  timeline.addEventListener(
    "click",
    (e) => {
      const timelineWidth = window.getComputedStyle(timeline).width
      const timeToSeek = (e.offsetX / parseInt(timelineWidth)) * audio.duration
      audio.currentTime = timeToSeek
    },
    false
  )

  //click volume slider to change volume
  const volumeSlider = audioPlayer.querySelector(".controls .volume-slider")
  volumeSlider.addEventListener(
    "click",
    (e) => {
      const sliderWidth = window.getComputedStyle(volumeSlider).width
      const newVolume = e.offsetX / parseInt(sliderWidth)
      audio.volume = newVolume
      audioPlayer.querySelector(".controls .volume-percentage").style.width =
        newVolume * 100 + "%"
    },
    false
  )

  //check audio percentage and update time accordingly
  setInterval(() => {
    const progressBar = audioPlayer.querySelector(".progress")
    progressBar.style.width = (audio.currentTime / audio.duration) * 100 + "%"
    audioPlayer.querySelector(".time .current").textContent = getTimeCodeFromNum(
      audio.currentTime
    )
  }, 500)

  //toggle between playing and pausing on button click
  // const playBtn = audioPlayer.querySelector(".controls .toggle-play")

  audioPlayer.querySelector(".volume-button").addEventListener("click", () => {
    const volumeEl = audioPlayer.querySelector(".volume-container .volume")
    audio.muted = !audio.muted
    if (audio.muted) {
      volumeEl.classList.remove("icono-volumeMedium")
      volumeEl.classList.add("icono-volumeMute")
    } else {
      volumeEl.classList.add("icono-volumeMedium")
      volumeEl.classList.remove("icono-volumeMute")
    }
  })

  //turn 128 seconds into 2:08
  function getTimeCodeFromNum(num) {
    let seconds = parseInt(num)
    let minutes = parseInt(seconds / 60)
    seconds -= minutes * 60
    const hours = parseInt(minutes / 60)
    minutes -= hours * 60

    if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`
    return `${String(hours).padStart(2, 0)}:${minutes}:${String(seconds % 60).padStart(2, 0)}`
  }
}

const SongInformation = (props) => {
  const { title, views, isMyFolder, isMyMusic, url, audioId, duration, userId, filter, handleAddToFolderBtn } = props
  const [isActive, setIsActive] = useState(false)
  const ref = useRef()
  function handleClickOutside(e) {
    if (!ref.current.contains(e.target)) {
      setIsActive(false)
      document.removeEventListener("mousedown", handleClickOutside)
      return
    }
  }
  const handleClick = () => {
    if (!isActive) {
      setIsActive(true)
      document.addEventListener("mousedown", handleClickOutside)
    }
  }
  return (
    <li className="adobe-product">
      <div className="products">
        <div className="text-scroll-wrap">
          <p className="text-scroll-content">{title}</p>
        </div>
      </div>
      <span className="status">
        <span className="status-circle green" />
        {views} views
      </span>
      <div className="button-wrapper">
        <button
          className="content-button status-button open"
          onClick={() => audioSet(url, title, audioId)}
        >
          Play
        </button>
        <div className="menu">
          <button
            ref={ref}
            onClick={handleClick}
            className={`dropdown ${isActive ? "is-active" : ""}`}
          >
            <ul>
              <li>
                <a
                  href="#"
                  onClick={() => {
                    if (title)
                      infoModal({
                        title,
                        views,
                        url,
                        audioId,
                        duration,
                        userId,
                        filter,
                      })
                  }}
                >노래 정보</a>
              </li>
              <li>
                <a href="#" onClick={() => handleAddToFolderBtn(audioId)}>폴더에 추가</a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={() => {
                    if (title) download(url, `${title}.mp3`)
                  }}
                >다운로드</a>
              </li>
              {isMyFolder && (
                <li>
                  <a href="#">폴더에서 삭제</a>
                </li>
              )}
              {isMyMusic && (
                <li>
                  <a href="#">음원 삭제</a>
                </li>
              )}
            </ul>
          </button>
        </div>
      </div>
    </li>
  )
}
export default SongInformation;