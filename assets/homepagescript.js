$(document).ready(function () {
  // if statement for if info stored in local storage is not equal to authorized (which i set up to be a boolen), if not equal then line 3 execute
  if(!localStorage.authorized) {
    // select window as global object, location set as the reference of the ageCheck html, renamed to index.html
    window.location.href = "/index.html";
  }

    var beerCard = $('.beer-card'); // target beer card class
    // make beer call not display with added css 
    beerCard.css('display', 'none');

    function fetchBrew(brew) {
      var queryURL = "https:api.punkapi.com/v2/beers?beer_name=" + brew;

      return $.ajax({
        url: queryURL,
        method: "GET", // GET, POST, UPDATE, DELETE –– HTTP METHODS
      });
    }
    
    var form = $('.my-searchbar form'); // var to target search bar element form
    var searchBar = $('.my-searchbar input'); // var to target input element of my-searchbar
    // Event handler 
    $(form).submit(function (e) { // the on submit event listener for form element 
      e.preventDefault(); // need this to prevent default because we dont want submission without input
      var brewName = searchBar.val(); // var of the brewName (name of beer we search for to be) in the searchBar to be set to method val() of empty, because taking into account user input
      // call functions searchBrews passing var BrewName in it, because we're taking what the user is input and passing that in the searchbrew function
      searchBrews(brewName);
    });

      // something to create my beer card
    function createBeerCard(beer) {
      var card = beerCard.clone().sortable(); // clone() copies the beerCard element, because our search could bring up multiple beers not just one card
      card.css('display', 'flex'); // the card will not display upon being searched with css("display", "flex")
      card.find('.beer-name').html(beer.name); // jquery method, find element class where beer name will go and replace the html with beer name pull from api
      card.find('.card-image img').attr('src', beer.image_url); // add image attr to image card
      // following lines are basically using find method to find class added on to the elements of the cards, we're appending the data as a blank, pulling from the specified object and properties from the api
      card.find('.beer-info').append(" " + beer.description); 
      card.find('.beer-hop').append(" " + beer.ingredients.hops.map(h => h.name).join(', '));
      card.find('.beer-ingredients').append(" " + beer.ingredients.malt.map(h => h.name).join(', '));
      card.find('.beer-tips').append(" " + beer.brewers_tips);
      card.find('.beer-pairing').append(" <br/>" + beer.food_pairing.join('<br />'));
      card.data('beer_id', beer.id);

      var favoriteBtn = card.find('.btn-favorite'); // target the created favorite buttons class.
      
      // Event handler
      $(favoriteBtn).click(function(e) { // on click for favorite button 
        var favorites = localStorage.favorites && JSON.parse(localStorage.favorites) || []; // favorites variable stores in local storage under favorites with && operator checking if data is store then stores in array
        favorites.push(beer.id) // pushes beer by id to favorites variable
        localStorage.setItem('favorites', JSON.stringify(favorites)); // 
      })

      return card;
    }
    
    // something to search the beer 
    function searchBrews(brewName) {
      var cardContainer = $('.my-container');
      cardContainer.html('');

      fetchBrew(brewName).then(beers => { // this is an arrow function (modern syntax declare functions)
        beers.forEach(beer => {
          var card = createBeerCard(beer);
          cardContainer.append(card);
        })
      });

      
    }

  });