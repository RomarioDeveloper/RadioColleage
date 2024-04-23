import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Record.css';

const Record = () => {
    let navigate = useNavigate();
    const [selectedAudio, setSelectedAudio] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [playlists, setPlaylists] = useState([]);
    const [selectedPlaylist, setSelectedPlaylist] = useState('');

    useEffect(() => {
        const fetchPlaylists = async () => {
            try {
                const response = await axios.get('http://localhost:3000/playlists');
                setPlaylists(response.data);
            } catch (error) {
                console.error('Ошибка при получении списка плейлистов:', error);
                alert('Произошла ошибка при загрузке списка плейлистов.');
            }
        };

        fetchPlaylists();
    }, []);

    const audioSelectedHandler = event => {
        setSelectedAudio(event.target.files[0]);
    };

    const imageSelectedHandler = event => {
        setSelectedImage(event.target.files[0]);
    };

    const handleFormSubmit = async event => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('audio', selectedAudio);
        formData.append('image', selectedImage);
        formData.append('title', title);
        formData.append('author', author);
        if (selectedPlaylist !== '' && selectedPlaylist !== null) {
        formData.append('PlaylistId', selectedPlaylist);
        }

        try {
            await axios.post('http://localhost:3000/catalogs', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            setSelectedAudio(null);
            setSelectedImage(null);
            setTitle('');
            setAuthor('');
            setSelectedPlaylist('');
            navigate('/');
            console.log(formData);
        } catch (error) {
            console.error('Ошибка при отправке файлов:', error);
            alert('Произошла ошибка при загрузке файлов на сервер.');
        }
    };

    return (
        <div className="music-upload-container">
            <form onSubmit={handleFormSubmit}>
                <div className="music-upload">
                    <input
                        type="file"
                        onChange={audioSelectedHandler}
                        id="audio-input"
                        style={{ display: 'none' }}
                        accept="audio/*"
                    /><br />
                    <label htmlFor="audio-input" className="file-label">
                        {selectedAudio ? selectedAudio.name : 'Выберите аудио'}
                    </label>
                </div>
                <div className="music-upload">
                    <input
                        type="file"
                        onChange={imageSelectedHandler}
                        id="image-input"
                        style={{ display: 'none' }}
                        accept="image/*"
                    /><br />
                    <label htmlFor="image-input" className="file-label">
                        {selectedImage ? selectedImage.name : 'Выберите постер'}
                    </label>
                </div>
                <div>
                    <label htmlFor="title-input" className="text-label">
                        Название
                    </label><br />
                    <input
                        type="text"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        id="title-input"
                        className="text-input"
                    />
                </div>
                <div>
                    <label htmlFor="author-input" className="text-label">
                        Автор
                    </label><br />
                    <input
                        type="text"
                        value={author}
                        onChange={e => setAuthor(e.target.value)}
                        id="author-input"
                        className="text-input"
                    />
                </div>
                <div>
                    <label htmlFor="playlist-input" className="text-label">
                        Плейлист
                    </label><br />
                    <select
                        value={selectedPlaylist}
                        onChange={e => setSelectedPlaylist(e.target.value)}
                        id="playlist-input"
                        className="select-input"
                    >
                        <option value="">Выберите плейлист</option>
                        {playlists.map(playlist => (
                            <option key={playlist.id} value={playlist.id ? (playlist.id) : (playlist.id)}>
                                {playlist.title}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit">Загрузить</button>
            </form>
        </div>
    );
};

export default Record;
