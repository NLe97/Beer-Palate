$(document).ready(function () {
  if(!localStorage.authorized) {
    window.location.href = "/index.html";
  }

    var beerCard = $('.beer-card');
    beerCard.css('display', 'none');

    function fetchBrew(brew) {
      var queryURL = "https:api.punkapi.com/v2/beers?beer_name=" + brew;

      return $.ajax({
        url: queryURL,
        method: "GET", // GET, POST, UPDATE, DELETE –– HTTP METHODS
      });
    }
    
    var form = $('.my-searchbar form');
    var searchBar = $('.my-searchbar input');
    // Event handler
    $(form).submit(function (e) {
      e.preventDefault();
      var brewName = searchBar.val();
      searchBrews(brewName);
    });

    function createBeerCard(beer) {
      var card = beerCard.clone();
      card.css('display', 'flex');
      card.find('.beer-name').html(beer.name);
      card.find('.card-image img').attr('src', beer.image_url);
      card.find('.beer-info').append(" " + beer.description);
      card.find('.beer-hop').append(" " + beer.ingredients.hops.map(h => h.name).join(', '));
      card.find('.beer-ingredients').append(" " + beer.ingredients.malt.map(h => h.name).join(', '));
      card.find('.beer-tips').append(" " + beer.brewers_tips);
      card.find('.beer-pairing').append(" <br/>" + beer.food_pairing.join('<br />'));
      card.data('beer_id', beer.id);

      var favoriteBtn = card.find('.btn-favorite');
      
      // Event handler
      $(favoriteBtn).click(function(e) {
        var favorites = localStorage.favorites && JSON.parse(localStorage.favorites) || [];
        favorites.push(beer.id)
        localStorage.setItem('favorites', JSON.stringify(favorites));
      })

      return card;
    }
    
  
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