$(document).ready(function() {
    if(!localStorage.authorized) {
        window.location.href = "/index.html";
      }
      
    var beerCard = $('.beer-card');
    beerCard.css('display', 'none');
    
    function fetchBrewByIds(brew_ids) {
    var queryURL = "https:api.punkapi.com/v2/beers?ids=" + brew_ids.join('|');

    return $.ajax({
      url: queryURL,
      method: "GET", // GET, POST, UPDATE, DELETE –– HTTP METHODS
    });
  }

  var favorites = localStorage.favorites && JSON.parse(localStorage.favorites) || [];
  var cardContainer = $('.my-container');
  cardContainer.html('');

  function createBeerCard(beer) {
    var card = beerCard.clone().sortable();
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
      favorites.splice(favorites.indexOf(beer.id), 1);
      card.remove();
      localStorage.setItem('favorites', JSON.stringify(favorites));
    })

    return card;
  }


  fetchBrewByIds(favorites).then(beers => {
    beers.forEach(beer => {
        var card = createBeerCard(beer);
        cardContainer.append(card);
      })
  })

  //lyft button logic
  // goes to lyft rider page

  $("#Lyft").click(function(){

    function newTab() {

      window.open("https://www.lyft.com/rider")

    }
      newTab();
  })
  //end lyft button logic

});