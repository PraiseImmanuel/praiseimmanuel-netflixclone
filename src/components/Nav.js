import "../styles/Nav.css";
import React, { useEffect, useState } from "react";
import Notification from "./Notifications";
import { useRef } from "react";

const Nav = () => {
    const [showNavBackground, setShowNavBackground] = useState(false);
    const [displaySearchInput, setDisplaySearchInput] = useState(false);

    const handleNavBackground = () => {
        window.scrollY > 10
            ? setShowNavBackground(true)
            : setShowNavBackground(false);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleNavBackground);
        return () => {
            window.removeEventListener("scroll", handleNavBackground);
        };
    }, []);

    const searchInput = useRef(null);

    useEffect(() => {
        const onBodyClick = (event) => {
            if (searchInput.current.contains(event.target)) {
                return;
            }
            setDisplaySearchInput(false);
        };
        document.addEventListener("click", onBodyClick);
        return () => {
            document.removeEventListener("click", onBodyClick);
        };
    }, []);

    const inputElement = useRef(null);

    useEffect(() => {
        if (inputElement.current) {
            inputElement.current.focus();
        }
    }, [displaySearchInput]);

    return (
        <nav>
            <div className={`nav ${showNavBackground && "nav-black"}`}>
                <div className="left-nav">
                    <a href="praise.com">
                        <img
                            src="/images/netflix-logo-png.png"
                            alt="Netflix Logo"
                            className="nav-logo"
                        />
                    </a>

                    <ul className="primary-nav-ul">
                        {/* <li className="nav-tab">
                            <a href="praise.com">Browse</a>
                        </li> */}
                        <li className="nav-tab">
                            <a href="praise.com" className="active">
                                Home
                            </a>
                        </li>
                        <li className="nav-tab">
                            <a href="praise.com">TV Show</a>
                        </li>
                        <li className="nav-tab">
                            <a href="praise.com">Movies</a>
                        </li>
                        <li className="nav-tab">
                            <a href="praise.com">New &#38; Popular</a>
                        </li>
                        <li className="nav-tab">
                            <a href="praise.com">My List</a>
                        </li>
                        <li className="nav-tab">
                            <a href="praise.com">Browse by Languages</a>
                        </li>
                    </ul>
                </div>

                <div className="right-nav">
                    <div ref={searchInput} className="search-box">
                        <div
                            className={`search-input ${
                                displaySearchInput
                                    ? "search-input-animate"
                                    : "visibility"
                            }`}
                        >
                            <div className="icon-and-input">
                                <button
                                    onClick={() => setDisplaySearchInput(false)}
                                >
                                    <img
                                        src="/images/search-icon.png"
                                        alt="search"
                                    />
                                </button>
                                <input
                                    ref={inputElement}
                                    type="name"
                                    placeholder="Titles, people, genres"
                                />
                            </div>

                            <button
                                onClick={() => setDisplaySearchInput(false)}
                            >
                                <img
                                    className="close"
                                    src="/images/close-icon.png"
                                    alt="close"
                                />
                            </button>
                        </div>
                        <button
                            className={`${displaySearchInput && "visibility"}`}
                            onClick={() => setDisplaySearchInput(true)}
                        >
                            <img src="/images/search-icon.png" alt="search" />
                        </button>
                    </div>

                    <div className="kids-link">
                        <a href="praise.com">Kids</a>
                    </div>

                    <div className="bell">
                        <button className="notification">
                            <img
                                src="/images/bell-icon.png"
                                alt="notifications"
                            />
                        </button>

                        <Notification />
                    </div>

                    <div className="avatar">
                        <img
                            src="/images/netflix-avatar.png"
                            alt="avatar"
                            className="nav-avatar"
                        />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Nav;
