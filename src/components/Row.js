import "../styles/Row.css";
import React, { useEffect, useState } from "react";
import axios from "../requests/axios";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import getRequests from "../requests/getRequest";

const base_url = "https://image.tmdb.org/t/p/original/";

const opts = {
    height: "900",
    width: "100%",
    playerVars: {
        autoplay: 1,
    },
};

const Row = ({ title, getUrl, isFirstRow }) => {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");
    const [genreList, setGenreList] = useState([]);

    const getGenreName = (genres_id) => {
        const genreNameWithSpaces = genres_id.map((id) => {
            const filtered = genreList.filter((genre) => {
                return id === genre.id;
            });

            if (filtered.length === 0) {
                return "";
            } else {
                return filtered[0].name;
            }
        });

        const genreName = genreNameWithSpaces.filter((item) => {
            return item !== "";
        });

        return genreName;
    };

    useEffect(() => {
        const getData = async () => {
            const response = await axios.get(getUrl);
            setMovies(response.data.results);
            return response;
        };
        getData();
    }, [getUrl]);

    useEffect(() => {
        const getGenreList = async () => {
            const response = await axios.get(getRequests.getGenreList);
            setGenreList(response.data.genres);
            return response;
        };
        getGenreList();
    }, []);

    const onImageClick = (movie) => {
        if (trailerUrl) {
            setTrailerUrl("");
        } else {
            movieTrailer(movie?.name || "")
                .then((url) => {
                    const urlParams = new URLSearchParams(new URL(url).search);
                    setTrailerUrl(urlParams.get("v"));
                })
                .catch((error) => console.log(error));
        }
    };
    console.log(movies);

    return (
        <div className={`row ${isFirstRow && "first-row"}`}>
            <h2 className="row-title-container">
                <div className="title-and-explore">
                    <div className="row-title">{title}</div>
                    <button className="explore-button">
                        <span className="explore">Explore All</span>
                        <img src="/images/right-arrow.png" alt="" />
                    </button>
                </div>
            </h2>

            <div className="row-posters">
                {movies.map((movie) => {
                    return (
                        <div className="row-poster-container" key={movie.id}>
                            <div className="row-poster-img">
                                <img
                                    src={`${base_url}${movie.backdrop_path}`}
                                    alt={movie.name}
                                />
                            </div>
                            <div
                                className="row-poster"
                                onClick={() => onImageClick(movie)}
                            >
                                <img
                                    src={`${base_url}${movie.backdrop_path}`}
                                    alt={movie.name}
                                />

                                <div className="row-poster-info">
                                    <div className="buttons">
                                        <div className="button">
                                            <img
                                                src="/images/play-button-arrowhead.png"
                                                alt=""
                                            />
                                        </div>
                                        <div className="button">
                                            <img
                                                src="/images/plus.png"
                                                alt=""
                                            />
                                        </div>
                                        <div className="button">
                                            <img
                                                src="/images/like.png"
                                                alt=""
                                            />
                                        </div>
                                    </div>

                                    <div className="movie-name-container">
                                        <div className="movie-name">
                                            {movie?.title ||
                                                movie?.name ||
                                                movie?.original_name}
                                        </div>
                                    </div>

                                    <div className="genre">
                                        <ul>
                                            {getGenreName(movie.genre_ids).map(
                                                (genreName) => {
                                                    return (
                                                        <li key={genreName}>
                                                            {genreName}
                                                        </li>
                                                    );
                                                }
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="right-arrow-container">
                <div className="right-arrow">
                    <img src="/images/right-arrow-white.png" alt="" />
                </div>
            </div>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
        </div>
    );
};

export default Row;
