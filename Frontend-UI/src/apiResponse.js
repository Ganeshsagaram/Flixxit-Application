const optionsHeader={
    method: 'GET',
    headers: {
      accept: 'application/json',
    Authorization:process.env.REACT_APP_BEARER_TOKEN
}
}

const apiURL = `https://api.themoviedb.org/3/search/movie?query=RRR&include_adult=false&language=en-US&page=1`;
fetch(apiURL, optionsHeader)
        .then(response => response.json())
        .then((data) => {
            let obj={

            }
            obj['movie']=data.results[0].title;
            obj['poster']=data.results[0].poster_path;
            obj['ReleaseDate']=data.results[0].release_date;
            obj['rating']=data.results[0].vote_average;
            console.log(obj)
        //   console.log(data);
        })
        .catch(err => {
          console.log(err);
});
