import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import SideBar from "../sideBar/SideBar";
import "react-h5-audio-player/lib/styles.css";
import "./main.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBackwardStep,
  faForwardStep,
  faPause,
  faPlay,
  faVolumeHigh,
  faVolumeXmark,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";



const Main = () => {
  const audioPlayerRef = useRef(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [tracks, setTracks] = useState([]);
  const [playStates, setPlayStates] = useState([]);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [searchTracks, setSearchTracks] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/catalogs")
      .then((response) => {
        const tracksData = response.data.map((track, index) => ({
          ...track,
          id: index,
        }));
        setTracks(tracksData);
        setPlayStates(Array(tracksData.length).fill(false));
      });
  }, []);

  const searchedTracks = tracks.filter((track) =>
  track.title.toLowerCase().includes(searchTracks.toLowerCase())
);

  const handleTogglePlay = (index) => {
    setCurrentTrackIndex(index);
    setIsPlaying(true);
    const newPlayStates = playStates.map((state, idx) => idx === index);
    setPlayStates(newPlayStates);
  
    if (audioPlayerRef.current) {
      const audioSrc = `http://localhost:3000/audios/${searchedTracks[index].audio}`;
      audioPlayerRef.current.src = audioSrc;
      audioPlayerRef.current.play().catch((error) => console.error(error));
    } 
  };
  
  
  const togglePlay = () => {
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
  };


  const playNextTrack = () => {
    if (currentTrackIndex !== null) {
      const nextIndex = (currentTrackIndex + 1) % searchedTracks.length;
      setCurrentTrackIndex(nextIndex);
      handleTogglePlay(nextIndex);
      setIsPlaying(true);
    }
  };
  
  const playPreviousTrack = () => {
    if (currentTrackIndex !== null) {
      const prevIndex = (currentTrackIndex - 1 + searchedTracks.length) % searchedTracks.length;
      setCurrentTrackIndex(prevIndex);
      handleTogglePlay(prevIndex);
    }
  };

  const closeMusic = () => {
    setCurrentTrackIndex(null);
    setIsPlaying(false);
  
    if (audioPlayerRef.current) {
      audioPlayerRef.current.pause();
      audioPlayerRef.current.currentTime = 0;
    }
  };

  const formatTime = (time) => {
    if (isNaN(time)) {
      return "00:00";
    }

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };



  useEffect(() => {
    const audio = audioPlayerRef.current;
  
    const handleEnded = () => {
      playNextTrack();
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration);
    };

    if (audio) {
      audio.addEventListener("ended", handleEnded);
      audio.addEventListener("timeupdate", handleTimeUpdate);
  
      return () => {
        audio.removeEventListener("ended", handleEnded);
        audio.removeEventListener("timeupdate", handleTimeUpdate);
      };
    }
  }, [audioPlayerRef.current]);

  return (
    <div>
    <section className="home-section">
      <div className="header">
        <h2 className="text">Музыка</h2>
        <div className="search">
          <FontAwesomeIcon icon={faMagnifyingGlass} style={{color: "#4a4e54",}} />
          <input type="text" 
          className="search__input"
          placeholder="Поиск..."
          onChange={(e) => setSearchTracks(e.target.value)} />
        </div>
      </div>
      <section id="music__card">
        <div className="container">
          <div className="music__card__list">
            {searchedTracks.map((track, index) => (
              <div className="music__card__item" key={index}>
                <div
                  className="music__card__img"
                  onClick={() => handleTogglePlay(index)}
                >
                  <label className="container">
                    <input
                      type="checkbox"
                      defaultChecked={playStates[index]}
                    />
                   
                    {isPlaying && currentTrackIndex === index ? (
                      <svg
                      viewBox="0 0 320 512"
                      height="1em"
                      xmlns="http://www.w3.org/2000/svg"
                      className="pauseIcon"
                    >
                      <path d="M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z"></path>
                    </svg>
                  ) : (
                    <svg
                      viewBox="0 0 384 512"
                      height="1em"
                      xmlns="http://www.w3.org/2000/svg"
                      className="play"
                    >
                      <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"></path>
                    </svg>
                  )}
                    <img src={`http://localhost:3000/images/${track.image}`} alt="" />
                    <p>{track.title}</p>
                    <span>{track.author}</span>
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
        </section>

        <div className="gh">
          <audio
            ref={audioPlayerRef}
            src={
              currentTrackIndex !== null ? `http://localhost:3000/audios/${searchedTracks[currentTrackIndex]?.audio}` : ""
            }
            autoPlay={isPlaying && currentTrackIndex !== null}
            onEnded={playNextTrack}
            volume={volume}
          />

          <div className="audio">
            <div className="but df">
              <input
                type="range"
                value={currentTime}
                max={audioPlayerRef.current?.duration || 0}
                onChange={(e) => {
                  setCurrentTime(e.target.value);
                  if (audioPlayerRef.current) {
                    audioPlayerRef.current.currentTime = e.target.value;
                  }
                }}
              />
              <p>
                {formatTime(currentTime)} /{" "}
                {formatTime(audioPlayerRef.current?.duration || 0)}
              </p>
            </div>
            <div className="but vb">
              <FontAwesomeIcon
                icon={faBackwardStep}
                onClick={playPreviousTrack}
              />
              <FontAwesomeIcon
                icon={isPlaying ? faPause : faPlay}
                onClick={() => {
                  togglePlay();
                  if (audioPlayerRef.current) {
                    if (isPlaying) {
                      audioPlayerRef.current.pause();
                      
                    } else {
                      audioPlayerRef.current.play();
                    
                    }
                  }
                }}
              />
              <FontAwesomeIcon icon={faForwardStep} onClick={playNextTrack} />
            </div>
            <div className="butd">
              <FontAwesomeIcon
                icon={isMuted ? faVolumeXmark : faVolumeHigh}
                onClick={() => {
                  setIsMuted((prevIsMuted) => !prevIsMuted);
                  if (audioPlayerRef.current) {
                    if (!isMuted) {
                      audioPlayerRef.current.volume = volume;
                    } else {
                      audioPlayerRef.current.volume = 0;
                    }
                    audioPlayerRef.current.muted = !isMuted;
                  }
                }}
              />

              <input
                type="range"
                value={volume}
                min={0}
                max={1}
                step={0.1}
                onChange={(e) => {
                  setVolume(parseFloat(e.target.value));
                  if (audioPlayerRef.current) {
                    audioPlayerRef.current.volume = parseFloat(e.target.value);
                  }
                }}
                style={{ backgroundColor: "#5E6E82" }}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Main;