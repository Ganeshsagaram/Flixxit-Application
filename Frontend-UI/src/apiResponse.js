const optionsHeader={
    method: 'GET',
    headers: {
      accept: 'application/json',
    //Authorization:process.env.BEARER_TOKEN
    Authorization:"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNTljMzFmZGI1YWRiNmI5YWRmODc4N2ZmYmM2N2M3NyIsIm5iZiI6MTcyODQ5MDAxNC44MjcwMDAxLCJzdWIiOiI2NzA2YWExZTdlM2NlZTdkM2Y5Y2Y1MTQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Ol874qbfuaMMLcRXoAFHQmnCzYscMWt26c-CWH5jPtU"
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
