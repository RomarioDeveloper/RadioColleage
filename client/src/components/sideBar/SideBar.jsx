import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './sideBar.css';

import logo from '../../img/logokit.svg'

const SideBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <div className={`sidebar ${isOpen ? 'open' : ''}`}>
                <div className="logo-details">
                    <div className="logo_name">Кит Медиа</div>
                    <i className={`bx ${isOpen ? 'bx-menu-alt-right' : 'bx-menu'}`} onClick={toggleSidebar} id="btn"></i>
                </div>
                <ul className="nav-list">
                    <li>
                        <Link to="/">
                            <i className='bx bx-home-alt'></i>
                            <span className="links_name">Главная</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/Library">
                            <i className='bx bx-grid-alt'></i>
                            <span className="links_name">Библиотека</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/Record">
                            <i className='bx bxs-download'></i>
                            <span className="links_name">Записать</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/">
                            <i class='bx bx-radio'></i>
                            <span className="links_name">Радио</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/Settings">
                            <i className='bx bx-cog'></i>
                            <span className="links_name">Настройки</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default SideBar;