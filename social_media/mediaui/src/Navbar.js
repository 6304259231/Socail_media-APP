import React, { useState } from 'react'
import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
    const [activeItem, setActiveItem] = useState(null);
    const changeStyle = (item) => {
        setActiveItem(item);
    };
    return (
        <div className='nav-main-section'>
            <div className='nav-aside'>
                <ul className='nav-ul-aside'>
                    <div className='li-nav-aside'>
                        <li-icon
                            type="app-linkedin-bug-color-icon"
                            className=" "
                            size="large"
                            role="img"
                            aria-label="LinkedIn"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                data-supported-dps="24x24"
                                fill="currentColor"
                                className="mercado-match"
                                width={44}
                                height={50}
                                focusable="false"
                            >
                                <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
                            </svg>
                        </li-icon>
                    </div>
                    <div>
                        <li>
                            <div className="input-group mb-3" style={{ "margin": "10px" }}>
                                <span className="input-group-text" id="inputGroup-sizing-default">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="20" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                                    </svg>
                                </span>
                                <input type="text" className="form-control input-nav" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder='Search here..' />
                            </div>
                        </li>
                    </div>
                </ul>
            </div>
            <div className='nav-middle-section'>
                <div className={`nav-item ${activeItem === 'home' ? 'active' : ''}`} onClick={() => changeStyle('home')}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="30" fill="currentColor" class="bi      bi-house-door-fill" viewBox="0 0 16 16">
                        <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5" />
                    </svg>
                    <div className='nav-text'>
                        <p className='nav-item-p active'> <Link to="/home"> Home </Link> </p>
                    </div>
                </div>
                <div className={`nav-item ${activeItem === 'network' ? 'active' : ''}`} onClick={() => changeStyle('network')}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="30" fill="currentColor" class="bi bi-people-fill" viewBox="0 0 16 16">
                        <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" />
                    </svg>
                    <div className='nav-text'>
                        <p className='nav-item-p'><Link to="/network"> Network</Link> </p>
                    </div>
                </div>
                <div className={`nav-item ${activeItem === 'profile' ? 'active' : ''}`} onClick={() => changeStyle('profile')}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="30" fill="currentColor" className="bi bi-person-bounding-box" viewBox="0 0 16 16">
                        <path d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5M.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5m15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5" />
                        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                    </svg>
                    <div className='nav-text'>
                        <p><Link to="/settings">profile</Link></p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Navbar