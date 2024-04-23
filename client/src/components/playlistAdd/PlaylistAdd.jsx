import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './PlaylistAdd.css';

const PlaylistAdd = () => {
    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const imageSelectedHandler = event => {
        setSelectedImage(event.target.files[0]);
    };

    const handleFormSubmit = async event => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('image', selectedImage);
        formData.append('title', title);
        formData.append('description', description);

        try {
            await axios.post('http://localhost:3000/playlists', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            setSelectedImage(null);
            setTitle('');
            setDescription('');
            navigate('/Library');
        } catch (error) {
            console.error('Ошибка при создании нового плейлиста:', error);
            alert('Произошла ошибка при создании нового плейлиста.');
        }
    };

    return (
        <div className="playlist-add-container">
            <form onSubmit={handleFormSubmit}>
                <div className="file-upload">
                    <input
                        type="file"
                        onChange={imageSelectedHandler}
                        id="audio-input"
                        style={{ display: 'none' }}
                        accept="image/*"
                    /><br />
                    <label htmlFor="audio-input" className="file-label">
                    {selectedImage ? selectedImage.name : 'Выберите изображение'}
                    </label>
                </div>
                <div>
                    <label htmlFor="title-input" className="text-label">
                        Название плейлиста
                    </label>
                    <input
                        type="text"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        id="title-input"
                        className="text-input"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description-input" className="text-label">
                        Описание плейлиста
                    </label>
                    <textarea
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        id="description-input"
                        className="textarea-input"
                        required
                    />
                </div>
                <button type="submit" className="playlist-add-button">
                    Добавить
                </button>
                <button className="playlist-return-button" onClick={() => {navigate("/Library")}}>
                    Вернуться
                </button>
            </form>
        </div>
    );
};

export default PlaylistAdd;
