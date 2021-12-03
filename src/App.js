import './App.css';
import './NewMain.css'
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import axios from 'axios'
// import { searchAudio } from "./apis/audioSearch"

import ContentHeader from './components/ContentHeader';
// Screen
import SignupWithSignin from './screens/SignupWithSignin'
import ResetPassword from './screens/ResetPassword'
import Music from './screens/Music';
import { useState } from 'react';
import SideMenu from './components/SideMenu';
import {useAuth} from './hooks/Auth'
import MusicUpload from './screens/MusicUpload';
import { searchAudio } from './apis/searchAudio';
import Folder from './screens/Folder';

axios.defaults.baseURL = 'https://api.pukuba.dev/api'

const urls = {
  Music: {
    name: 'Music',
    path: '/',
  },
  Folder: {
    name: 'Folder',
    path: '/folder',
  },
  Music_Upload: {
    name: 'Music Upload',
    path: '/musicupload',
  },
  Folder_Upload: {
    name: 'Folder Upload',
    path: '/folderupload',
  },
  Signup: {
    name: 'Signup',
    path: '/signup',  
  },
  Signin: {
    name: 'Signin',
    path: '/signin',
  },
  Reset_Password: {
    name: 'Reset Password',
    path: '/resetpassword',
  },
}

const top_menus = {
  Music: urls.Music,
  Folder: urls.Folder,
  Music_Upload: urls.Music_Upload,
  Folder_Upload: urls.Folder_Upload,
}

const findUrl = (path) => {
  for (let key in urls)
    if (urls[key].path === path)
      return urls[key]
}

const sortOptions = {
  views: {
    name: 'views',
    desc: 'ViewsDesc',
    asc: 'ViewsAsc',
  },
  date : {
    name: 'date',
    desc: 'Latest',
    asc: 'Last'
  }
}

function App() {
  const auth = useAuth();
  const [sortOption, setSortOption] = useState(sortOptions.date.desc)
  const handleClickSortOption = (e) => {
    setSortOption(e.target.value)
  }
  
  const side_menus = [
    {
      category: 'Music',
      menus: [
        {
          content: 'Sorted by views',
          value: sortOptions.views.desc,
          onClick: handleClickSortOption,
          src: 'https://img.icons8.com/external-kiranshastry-gradient-kiranshastry/64/000000/external-view-cyber-security-kiranshastry-gradient-kiranshastry-2.png',
        },
        {
          content: 'Sorted by date',
          value: sortOptions.date.desc,
          onClick: handleClickSortOption,
          src: 'https://img.icons8.com/external-icongeek26-outline-colour-icongeek26/64/000000/external-date-camping-icongeek26-outline-colour-icongeek26.png',
        },
      ],
    },
    {
      category: 'Folder',
      menus: [
        {
          content: 'Last update',
          src: 'https://img.icons8.com/nolan/64/approve-and-update.png',
        },
        {
          content: 'Sorted by likes',
          src: 'https://img.icons8.com/external-kiranshastry-lineal-color-kiranshastry/64/000000/external-like-music-kiranshastry-lineal-color-kiranshastry.png',
        },
        {
          content: ' My favorite folder',
          src: 'https://img.icons8.com/nolan/64/folder-invoices.png',
        },
        {
          content: ' My folder',
          src: 'https://img.icons8.com/nolan/64/folder-invoices.png',
        },
      ],
    },
    {
      category: 'Resource Links',
      menus: [
        {
          content: 'Youtube',
          src: 'https://img.icons8.com/nolan/64/youtube-play.png',
          href: 'https://www.youtube.com/',
        },
      ],
    }
  ]

  const [menu, setMenu] = useState(findUrl(useLocation().pathname).name)
  const [searchInput, setSearchInput] = useState('')
  const handleSearchChange = e => setSearchInput(e.target.value)
  const handleSearchKeyDown = e => {
    if (e.key === 'Enter') {
      // TODO: search 기능 구현, 탭에 맞춤형 검색 기능 제공(음원, 폴더)
      if (menu === top_menus.Music.name || menu === top_menus.Music_Upload.name) {
        searchAudio(searchInput).then(res => console.log(res))
      }
      else if (menu === top_menus.Folder.name || menu === top_menus.Folder_Upload.name) {
        console.log('TODO: search 기능 구현 [Folder]')
      }
    }
  }
  return (
    <div>
      <div className="video-bg">
        <video width={320} height={240} autoPlay loop muted>
          <source src="https://assets.codepen.io/3364143/7btrrd.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="app">
        <div className="header">
          <div className="menu-circle" />
          <div className="header-menu">
            {Object.entries(top_menus).map(([_, { name, path }], index) =>
              <Link className={`menu-link ${menu === name ? 'is-active' : ''}`}
                onClick={() => setMenu(name)}
                key={index} to={path}>
                {name}
              </Link>
            )}
            {/* Example : <a className="menu-link notify is-active" href="#">Folder Upload</a> */}
          </div>
          <div className="search-bar">
            <input type="text" placeholder="Search" value={searchInput} onChange={handleSearchChange} onKeyDown={handleSearchKeyDown} />
          </div>
          <div className="header-profile">
            <div className="dark-light"
              onClick={() => {
                document.body.classList.toggle("light-mode")
              }}>
              <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
              </svg>
            </div>
            <Link to="/signin" onClick={(e) => {
              if (auth.isSignedIn()) auth.signout()
              else setMenu(urls.Signin.name)
              }}>
            <img className="profile-img" src="https://images.unsplash.com/photo-1600353068440-6361ef3a86e8?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" alt="" />
            </Link>
          </div>
        </div>
        <div className="wrapper">
          <div className="left-side">
              {side_menus.map((category, index) =>
              <div className='side-wrapper' key={index}>
                <div className="side-title">{category.category}</div>
                <div className='side-menu'>
                  {category.menus.map((menu, index) => 
                    <SideMenu key={index} value={menu.value} {...menu} />)
                  }
                </div>
              </div>
              )}
          </div>
          <div className="main-container">
            {/* <div class="main-header"></div>  */}
            <div className="content-wrapper">
              {/* Content here */}
              <ContentHeader />
              <Routes>
                <Route path="/" element={<Music sortOption={sortOption}/>} />
                <Route path="/signin" element={<SignupWithSignin signin />}/>
                <Route path="/signup" element={<SignupWithSignin signin={false} />}/>
                <Route path="/reset_password" element={<ResetPassword />}/>
                <Route path="/folder" element={<Folder/>}/>
                <Route path={urls.Music_Upload.path} element={<MusicUpload />}/>
              </Routes>
            </div>
          </div>
        </div>
        <div className="overlay-app" />
      </div>
    </div>
  );
}

export default App;

