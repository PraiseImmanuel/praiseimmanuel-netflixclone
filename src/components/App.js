import "../styles/App.css";
import React from "react";
import Row from "./Row";
import getRequests from "../requests/getRequest";
import Banner from "./Banner";
import Nav from "./Nav";

const App = () => {
    return (
        <div className="app">
            <Nav />
            <Banner />
            <Row
                title="Action Movies"
                getUrl={getRequests.getNetflixOriginals}
                isFirstRow
            />
            <Row title="Trending Now" getUrl={getRequests.getTrending} />
            <Row title="Top Rated" getUrl={getRequests.getTopRated} />
            <Row title="Popular" getUrl={getRequests.getPopular} />
            <Row title="Top Rated TV Shows" getUrl={getRequests.getTVShows} />
            <Row title="Upcoming" getUrl={getRequests.getUpcoming} />
        </div>
    );
};

export default App;

// <Row title="" getUrl={} />
