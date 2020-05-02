fetch("https://api.punkapi.com/v2/beers/random", { 
})
    .then(res => res.json())
    .then(data => console.log(data))

//function userSearch (search) {}

//function userData (data) {}

$.ajax ({
    url: "https://api.punkapi.com/v2/beers/random",
    method: "GET", 
}).then(function(response) {
    console.log(response);
});