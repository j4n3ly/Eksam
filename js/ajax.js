$(function() {
    var api_link = "https://api.themoviedb.org/3/";
    var api_key = "?api_key=72fa931d41e79867b6b52ea1ae2385ec";
    var oldMovieId = 0;
    var pageNumber = 1;
    $("#nav").load("navbar.html");
    $("#footer").load("footer.html");
    $("#next, #previous").hide();
    $("#search").click(function() {
         getMovies(pageNumber);
    });
    $("#next").click(function() {
        pageNumber = pageNumber + 1;
        getMovies(pageNumber);
    });
    $("#previous").click(function() {
        pageNumber = pageNumber - 1;
        getMovies(pageNumber);
    });
    getGenres();

    function getMovies(pageNumber) {
        var url = "";
        var title = "&query=" + $("#title").val();
        var genre = "&with_genres=" + $("#genre").val();
        var year = "&year=" + $("#year").val();
        // Checkboxi kontroll, on = true
        if($("#adult:checked").val() === "on") {
            var adult = "&include_adult=true";
        } else {
            var adult = "&include_adult=false";
        }
        // discover/movie api ots ei võimalda otsida filmi sõnade järgi, seega peab kasutama teist otsa
        if($("#title").val().length > 0) {
            url = api_link + "search/movie" + api_key + title + year + adult + "&page=" + pageNumber;
        } else {
            url = api_link + "discover/movie" + api_key + "&page=" + pageNumber + adult + genre + year;
        }   
        // Päring filmide saamiseks
        $.ajax({
            method: "GET",
            url: url,
            dataType: "json",
            success: function( result ) {
                // Tühjendame filmide div, et search nuppu vajutades ei duplikeeriks filme ning alati näitaks 20 erinevat filmi
                $("#films").empty();

                var movies = result.results;
                var movieIds = [];

                if(pageNumber === 1) {
                    $("#previous").hide();
                } else {
                    $("#previous").show();
                }

                $("#next").show();

                for (var i = 0; i < movies.length; i++) {
                    movieIds.push(movies[i].id);

                    // Koodilõik zanrite id ja nime kokkuviimiseks
                    movieGenres = [];
                    // movies oli array genre_ids id-dega, ex [1,2,3]
                    for (let m = 0; m < movies[i].genre_ids.length; m++) {
                        var genre = genres.find(element => element.id ===  movies[i].genre_ids[m]);
                        movieGenres.push(" " + genre.name)
                    }
                    // Aasta kuvamine
                    movieYear = movies[i].release_date.substring(0, 4);
                    
                    // Pildi kuvamine
                    if(movies[i].poster_path != null) {
                        moviePicture = "https://image.tmdb.org/t/p/w500/" + movies[i].poster_path;
                    } else {
                        moviePicture = "https://via.placeholder.com/500x750";
                    }
                    movieId = movies[i].id;
                    // Ühe filmi card html
                    cardHtml = 
                    "<div id=" + movieId + " class='col-12 col-lg-6 movie text-secondary'>" +
                        "<div class='card'>" +
                            "<div class='d-flex'>" +
                                "<div class='col-4'>" +
                                    "<img src=" + moviePicture + " class='img-fluid rounded-start poster' >" +
                                "</div>" +
                                "<div class='col-8'>" +
                                    "<div class='card-body pb-5'>" +
                                        "<h5 class='card-title'>" + movies[i].title + "(" + movieYear + ")</h5>" +
                                        "<p id='" + movieId + "-overview' class='card-text overview '>" + movies[i].overview + "</p>" +
                                        "<div id='" + movieId + "-actors' class='col-12 d-flex flex-wrap justify-content-between my-4'></div>" + 
                                        "<p class='card-text position-absolute bottom-0 mb-2'><small class='text-muted'>" + movieGenres + "</small></p>" +
                                    "</div>" +
                                "</div>" +
                            "</div>" +
                        "</div>" +
                    "</div>";
                    // Lisab films elemendi külge cardHTML
                    $("#films").append(cardHtml);
                }
                // Appendiga ei saa anda kaasa onclick funktsiooni, seega peab pärast selle külge panema
                for (let index = 0; index < movieIds.length; index++) {
                    $("#" + movieIds[index]).click(function() {
                        getMovieDetails(movieIds[index])
                    })
                } 
            } 
        });
    }
    // Päring, et saada kõik filmi zanrid, sest filmi päringust tulevad vaid zanri id-d
    function getGenres() {
        $.ajax({
            method: "GET",
            url: api_link + "genre/movie/list" + api_key,
            dataType: "json",
            success: function( result ) {
                genres = result.genres;
                for (let i = 0; i < genres.length; i++) {
                    genreHTML = "<option value=" + genres[i].id + ">" + genres[i].name + "</option>";
                    // Lisab genre select elemendi külge genreHTML
                    $("#genre").append(genreHTML)
                }
            } 
        });
    }

    function getMovieDetails(movieId) {
        var movieCastUrl = api_link + "movie/" + movieId + "/credits" + api_key;
        // Päri näitlejad
        $.ajax({
            method: "GET",
            url: movieCastUrl,
            dataType: "json",
            success: function( result ) {
                $("#" + movieId).removeClass("col-lg-6");
                for (let index = 0; index < 4; index++) {
                    actorHtml = "<div class='d-flex flex-column text-center align-items-center col-6 col-md-3'>" +
                                    "<img src='https://image.tmdb.org/t/p/w92" + result.cast[index].profile_path + "' class='rounded-circle profile-img'>" + 
                                    result.cast[index].name +
                                "</div>";
                    $("#" + movieId + "-actors").append(actorHtml);
                }
                $("#" + movieId + "-overview").addClass("overview-full");
                if(oldMovieId > 0){
                    $("#" + oldMovieId).addClass("col-lg-6");
                    $("#" + oldMovieId + "-actors").empty();
                    $("#" + oldMovieId + "-overview").removeClass("overview-full");
                }
                
                oldMovieId = movieId;
                $("#" + movieId).get(0).scrollIntoView();
            } 
        });
    }
});