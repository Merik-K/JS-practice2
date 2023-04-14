'use scrict';

$(function () {
  //settings for the slider
  //we need to know the width of the slider so that we know how far it should slide
  var width = 720;
  //it takes 2 seconds to transition between slides
  var animationSpeed = 250;
  //jquery will queue up actions and event so make suer thag you add your animationspeed to the pause or it will keep rinning with no pause
  var pause = animationSpeed + 500;
  var currentSlide = 1;

  //cache DOM elements
  var $slideContainer = $('.slides');
  var $slides = $('.slide');

  var interval;

  //create a function that will start the slider
  function startSlider() {
    interval = setInterval(function () {
      //animating the slideContainer will vause the action in the brackets, targeting the css
      $slideContainer.animate(
        { 'margin-left': '-=' + width },
        //it will do this animation every time at this length
        animationSpeed,
        //we can run acallback function at the end if we choose to
        function () {
          //we track the slide taht we are on
          currentSlide++;
          //This happens after the animation, so if the length is greater than the slide (6) we rest to 1
          //Since slide 1 is the first and last slide on the deck the user wont notice when we reset back to slide 1
          if (currentSlide === $slides.length) {
            currentSlide = 1;
            $slideContainer.css('margin-left', 0);
          }
        }
      );
      //It will repeat its action every THIS often
    }, pause);
  }

  //Create a function that will remove the slider
  function pauseSlider() {
    clearInterval(interval);
  }

  //Start Slider
  startSlider();

  //If the mouse hovers over the slide then the animation stops and then it leaves it starts again
  $slideContainer.on('mouseenter', pauseSlider).on('mouseleave', startSlider);

  // If mouse hovers then transition speed will reduce to haldf
  $slideContainer.hover(function () {
    animationSpeed = 125;
  });
});
