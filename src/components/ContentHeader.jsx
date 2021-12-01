import React from 'react';

export default () => {
    return (
        <div className="content-wrapper-header">
            <div className="content-wrapper-context">
                <h3 className="img-content">
                    <svg viewBox="0 0 512 512">
                        <path d="M467 0H45C20.099 0 0 20.099 0 45v422c0 24.901 20.099 45 45 45h422c24.901 0 45-20.099 45-45V45c0-24.901-20.099-45-45-45z" fill="#d6355b" data-original="#ff468c" />
                        <path xmlns="http://www.w3.org/2000/svg" d="M512 45v422c0 24.901-20.099 45-45 45H256V0h211c24.901 0 45 20.099 45 45z" fill="#d6355b" data-original="#d72878" />
                        <path xmlns="http://www.w3.org/2000/svg" d="M467 30H45c-8.401 0-15 6.599-15 15v422c0 8.401 6.599 15 15 15h422c8.401 0 15-6.599 15-15V45c0-8.401-6.599-15-15-15z" fill="#2e000a" data-original="#700029" />
                        <path xmlns="http://www.w3.org/2000/svg" d="M482 45v422c0 8.401-6.599 15-15 15H256V30h211c8.401 0 15 6.599 15 15z" fill="#2e000a" data-original="#4d0e06" />
                        <path xmlns="http://www.w3.org/2000/svg" d="M181 391c-41.353 0-75-33.647-75-75 0-8.291 6.709-15 15-15s15 6.709 15 15c0 24.814 20.186 45 45 45s45-20.186 45-45-20.186-45-45-45c-41.353 0-75-33.647-75-75s33.647-75 75-75 75 33.647 75 75c0 8.291-6.709 15-15 15s-15-6.709-15-15c0-24.814-20.186-45-45-45s-45 20.186-45 45 20.186 45 45 45c41.353 0 75 33.647 75 75s-33.647 75-75 75z" fill="#d6355b" data-original="#ff468c" />
                        <path xmlns="http://www.w3.org/2000/svg" d="M391 361h-30c-8.276 0-15-6.724-15-15V211h45c8.291 0 15-6.709 15-15s-6.709-15-15-15h-45v-45c0-8.291-6.709-15-15-15s-15 6.709-15 15v45h-15c-8.291 0-15 6.709-15 15s6.709 15 15 15h15v135c0 24.814 20.186 45 45 45h30c8.291 0 15-6.709 15-15s-6.709-15-15-15z" fill="#d6355b" data-original="#d72878" />
                    </svg>
                    노래 제목
                </h3>
                <div className="content-text">
                    <div className="audio-player">
                        <div className="timeline">
                            <div className="progress" />
                        </div>
                        <div className="controls">
                            <div className="play-container">
                                <div className="toggle-play play" />
                            </div>
                            <div className="time">
                                <div className="current">0:00</div>
                                <div className="divider">/</div>
                                <div className="length" />
                            </div>
                            <div className="name">노래 제목</div>
                            <div className="volume-container">
                                <div className="volume-button">
                                    <div className="volume icono-volumeMedium">🔉</div>
                                </div>
                                <div className="volume-slider">
                                    <div className="volume-percentage" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button className="content-button">Download</button>
            </div>
            <img className="content-wrapper-img" src="https://media.discordapp.net/attachments/817461127574716488/910613314323750952/logo.png" alt="" />
        </div>
    );
}