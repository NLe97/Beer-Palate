$(document).ready(function () {
  $(".ageCheck").on("click", function () {
    var ageInput = $('.ageInput');
    var day = ageInput.val().split('/')[1];
    var month = ageInput.val().split('/')[0];
    var year = ageInput.val().split('/')[2];
    /*
      We're going to collect and parse the values from the input in the format mm/dd/yy, with this:
      var day = agentInput.val().split('/')[1];
      Then, we're going to check if the current year minus the year of the given input is greater than 21:
      current Year -> new Date().getFullYear()
      input Year -> new Date(Date.parse(`${month}-${day}-${year}`)).getFullYear()
    */
    console.log(new Date().getFullYear);
    console.log(new Date(Date.parse(`${month}-${day}-${year}`)).getFullYear());
    console.log(new Date().getFullYear() - new Date(Date.parse(`${month}-${day}-${year}`)).getFullYear());
    
    var appropriateAge = new Date().getFullYear() - new Date(Date.parse(`${month}-${day}-${year}`)).getFullYear() >= 21;
    localStorage.setItem('authorized', appropriateAge ? true : false);
    if(appropriateAge) {
      window.location.href = "/Beer-Palate---Project-1/Homepage.html";
    } else {
      window.location.href = "https://www.nick.com/shows/spongebob-squarepants";
    }
  });


});

//Things to do -
// Make it so that if the user is under 21 they get redirected to a kid friendly page
//Check to see if the age is legal, if so then let the user access the page
//All that will run once the user hits the verify button
//Set it to redirect the user if they try to skip the age verification process
//Only allow the user to view the page once its confiremed they are 21
