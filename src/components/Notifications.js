import "../styles/Notifications.css";
import React, { useState } from "react";
import { useEffect } from "react";
import axios from "../requests/axios";
import getRequests from "../requests/getRequest";

const randomListOfSix = (arr) => {
    //sort array elements in ascending or desending order depending
    //on what value Math.random returns (therefore shuffling the arr)
    return arr.sort(() => 0.5 - Math.random()).slice(0, 6);
};

const findTimeRange = (str) => {
    //get today's date and movie date
    const todaysDate = new Date();
    const movieDate = new Date(str);
    //find the difference
    const difference = Math.abs(todaysDate - movieDate);
    //(1000 * 60 * 60 * 24) is the number millseconds in a day
    const differenceInDays = Math.round(difference / (1000 * 60 * 60 * 24));

    if (differenceInDays === 1) return "Yesterday";
    if (differenceInDays < 7) {
        return `${differenceInDays} days ago`;
    } else {
        const differenceInWeeks = Math.round(differenceInDays / 7);
        if (differenceInWeeks === 1) return "1 week ago";
        if (differenceInWeeks < 4) {
            return `${differenceInWeeks} weeks ago`;
        } else {
            const differenceInMonths = Math.round(differenceInWeeks / 4);
            if (differenceInMonths === 1) return "1 month ago";
            if (differenceInMonths < 12) {
                return `${differenceInMonths} months ago`;
            } else {
                return " Over a year ago";
            }
        }
    }
};

const Notification = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const response = await axios.get(getRequests.getTrending);
            setMovies(randomListOfSix(response.data.results));
            // return response;
        };
        getData();
    }, []);

    return (
        <div className="notifications-full-container">
            <div className="empty"></div>
            <div className="notifications-container">
                {movies.map((movie) => (
                    <div className="notification-item" key={movie.id}>
                        <div className="notification-image">
                            <img
                                src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
                                alt={movie.title}
                            />
                        </div>
                        <div className="notification-text">
                            <p className="text">
                                {movie.title ||
                                    movie.name ||
                                    movie.original_name}
                            </p>
                            <p className="date">
                                {findTimeRange(
                                    movie.release_date || movie.first_air_date
                                )}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Notification;
