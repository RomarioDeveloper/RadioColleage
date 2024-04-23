import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import './Library.css';

const Library = () => {
    const navigate = useNavigate();
    const [playlists, setPlaylists] = useState([]);
    const [searchPlaylists, setSearchPlaylists] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:3000/playlists/`)
            .then(response => {
                setPlaylists(response.data);
            })
            .catch(error => {
                console.error('Ошибка при получении данных:', error);
            });
    }, []);

const searchedPlaylists = playlists.filter((playlist) =>
    playlist.title.toLowerCase().includes(searchPlaylists.toLowerCase())
  );


    return (
        <section className='home-section'>
            <div className="header">
                <h2 className="text">Каталоги</h2>
                <div className="search">
                <FontAwesomeIcon icon={faMagnifyingGlass} style={{color: "#4a4e54",}} />
                <input type="text" 
                className="search__input"
                placeholder="Поиск..."
                onChange={(e) => setSearchPlaylists(e.target.value)} />
                </div>
        </div>
            <div className="playlists">
                {searchedPlaylists.map(playlist => (
                    <div
                        className="playlist"
                        key={playlist.id}
                        onClick={() => navigate(`/Library/${playlist.id}`)}
                    >
                        <img src={`http://localhost:3000/images/${playlist.image}`} alt={playlist.title} className="playlist-image" />
                        <h3 className="playlist-title">{playlist.title}</h3>
                        <p className="playlist-description">{playlist.description}</p>
                    </div>
                ))}
            </div>
            <div className='button-addPlaylist'>
                <button onClick={() => {navigate("/PlaylistAdd")}}>
                        Добавить новый каталог
                </button>
            </div>
        </section>
        );
}

export default Library;
