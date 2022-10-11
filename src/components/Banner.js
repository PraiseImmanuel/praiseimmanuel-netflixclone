import "../styles/Banner.css";
import React, { useEffect, useState } from "react";
import axios from "../requests/axios";
import getRequests from "../requests/getRequest";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import { useRef } from "react";

const truncate = (string, maxLength) => {
    return string?.length > maxLength
        ? string.substr(0, maxLength - 1) + "..."
        : string;
};

const opts = {
    height: "900",
    width: "100%",
    playerVars: {
        autoplay: 1,
    },
};

// const base_url = "https://image.tmdb.org/t/p/original/";

const Banner = () => {
    const [movie, setMovie] = useState([]);
    const [shuffle, setShuffle] = useState(false);
    const [playing, setPlaying] = useState(false);
    const [clickPlay, setClickedPlay] = useState(false);

    useEffect(() => {
        const getData = async () => {
            const response = await axios.get(getRequests.getActionMovies);
            setMovie(
                response.data.results[
                    Math.floor(Math.random() * response.data.results.length)
                ]
            );
        };
        getData();
    }, [shuffle]);

    const shuffleFunc = () => {
        if (shuffle === true) {
            setShuffle(false);
        } else {
            setShuffle(true);
        }
    };

    const errorMessageRef = useRef(null);

    const displayErrorMessage = () => {
        errorMessageRef.current.classList.add("show");
        setTimeout(
            () => errorMessageRef.current.classList.remove("show"),
            2000
        );
    };

    const [trailerUrl, setTrailerUrl] = useState("");

    const onImageClick = (movie) => {
        setClickedPlay(true);
        if (trailerUrl) {
            setTrailerUrl("");
        } else {
            movieTrailer(null, { tmdbId: movie.id })
                .then((url) => {
                    const urlParams = new URLSearchParams(new URL(url).search);
                    setTrailerUrl(urlParams.get("v"));
                })
                .catch((error) => {
                    shuffleFunc();
                    displayErrorMessage();
                });
        }
    };

    const onEnd = () => {
        setPlaying(false);
        setClickedPlay(false);
        setTrailerUrl("");
    };

    return (
        <header className="banner">
            <div className={`video-container ${playing && "visible"}`}>
                <YouTube
                    opts={opts}
                    videoId={trailerUrl}
                    onPlay={() => setPlaying(true)}
                    onEnd={() => onEnd()}
                />
            </div>

            <div className={`error-message`} ref={errorMessageRef}>
                Sorry, Movie trailer unavailable.
            </div>

            <div className="banner-img">
                <div
                    className={`video-top-shadow vignette-layer ${
                        playing && "visible"
                    }`}
                ></div>
                <div className="img-thumbnail">
                    <img
                        className={`${clickPlay && "hidden"}`}
                        src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
                        alt="thumbnail"
                    />
                    <div className="banner-contents-shadow vignette-layer "></div>
                    <div className="img-thumbnail-bottom-shadow vignette-layer"></div>
                </div>
            </div>

            <div className="banner-info">
                <div className="banner-contents">
                    <h1 className="banner-title">
                        {movie?.title || movie?.name || movie?.original_name}
                    </h1>

                    <p
                        className={`banner-description ${
                            clickPlay && "hidden"
                        }`}
                    >
                        {truncate(movie?.overview, 150)}
                    </p>
                    <div className="banner-buttons">
                        <button
                            className="banner-button"
                            onClick={() => onImageClick(movie)}
                        >
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="Hawkins-Icon Hawkins-Icon-Standard"
                            >
                                <path
                                    d="M4 2.69127C4 1.93067 4.81547 1.44851 5.48192 1.81506L22.4069 11.1238C23.0977 11.5037 23.0977 12.4963 22.4069 12.8762L5.48192 22.1849C4.81546 22.5515 4 22.0693 4 21.3087V2.69127Z"
                                    fill="currentColor"
                                ></path>
                            </svg>
                            <div>Play</div>
                        </button>
                        <button className="banner-button more-info">
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="Hawkins-Icon Hawkins-Icon-Standard"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3ZM1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM13 10V18H11V10H13ZM12 8.5C12.8284 8.5 13.5 7.82843 13.5 7C13.5 6.17157 12.8284 5.5 12 5.5C11.1716 5.5 10.5 6.17157 10.5 7C10.5 7.82843 11.1716 8.5 12 8.5Z"
                                    fill="currentColor"
                                ></path>
                            </svg>
                            <div>More Info</div>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Banner;
