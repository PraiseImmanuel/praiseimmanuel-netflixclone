const API_KEY = "b105f72a7f7b998e390aa7ede474076c";

const getRequests = {
    getTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`,
    getPopular: `/movie/popular?api_key=${API_KEY}&language=en-US&page=1`,
    getUpcoming: `/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`,
    getTrending: `/trending/all/day?api_key=${API_KEY}`,
    getTVShows: `/tv/top_rated?api_key=${API_KEY}&language=en-US&page=1`,
    getNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
    getActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
    getComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
    getDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
    getGenreList: `genre/movie/list?api_key=${API_KEY}&language=en-US`,
};

export default getRequests;
