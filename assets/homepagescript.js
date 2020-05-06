$(document).ready(function () {
    var queryURL = "https:api.punkapi.com/v2/beers/random";
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      console.log(response);
    });
  ​
    //function that takes in user input and makes ajax call
  ​
    function searchBrews(input) {
      //input represents user value
      //then take the value and make ajax call to punkAPI
  ​
      //once data has been received from punkAPI call next function with data passed as an argument
      doSomething();
    }
  ​
    function doSomething(data) {
      //function that does whatever
    }
  });