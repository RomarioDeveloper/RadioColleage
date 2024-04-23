import React from 'react';
import { Route, Routes } from 'react-router-dom';

import SideBar from './components/sideBar/SideBar';
import Main from './components/main/Main';
import Library from './components/library/Library';
import Playlist from './components/playlist/Playlist';
import PlaylistAdd from './components/playlistAdd/PlaylistAdd';
import Record from './components/record/Record';
import Settings from './components/settings/Settings';

const App = () => {
  return (
    <div className="App">
      <div>
        <SideBar />
      </div>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/Library" element={<Library />} />
        <Route path="/PlaylistAdd" element={<PlaylistAdd />} />
        <Route path="/Library/:id" element={<Playlist />} />
        <Route path="/Record" element={<Record />} />
        <Route path="/Settings" element={<Settings />} />
      </Routes>
    </div>
  );
}

export default App;