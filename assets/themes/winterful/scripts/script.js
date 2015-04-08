/* We need to tell jshint which are our global variables */
/* global document: false,
    window: false
*/

'use strict';

var theme = {};
var superSpeed = 0;

theme.onUpdate = function(power) {
  superSpeed = power / 1000;
};

theme.usageExamples = [
      {
        action: 'Powering',
        consumption: (0.000483 * 26400000) / 100,
        object: '% of UK homes' },
      {
        action: 'Or driving home for Christmas',
        consumption: 0.00038,
        object: 'miles (in a Tesla Model S)' },
      {
        action: 'Or watching "How the Grinch Stole Christmas!"',
        consumption: 0.000024,
        object: 'times' },
      {
        action: 'Or baking',
        consumption: 0.0000185,
        object: 'mince pies' }
    ];

window.onload = function() {
  //canvas init
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');

  //canvas dimensions
  var W = window.innerWidth;
  var H = window.innerHeight;
  canvas.width = W;
  canvas.height = H;

  //snowflake particles

  // max particles
  var mp = 512;
  var particles = [];

  for (var i = 0; i < mp; i++) {
    /*
      x - coordinate
      y - coordinate
      r - radius
      d - density
     */
    particles.push({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 4 + 1,
      d: Math.random() * mp
    });
  }

  //Lets draw the flakes
  function draw() {
    ctx.clearRect(0, 0, W, H);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.beginPath();

    for (var i = 0; i < mp; i++) {
      var p = particles[i];
      ctx.moveTo(p.x, p.y);
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, true);
    }

    ctx.fill();
    update();

    window.requestAnimationFrame(draw);
  }

  // Function to move the snowflakes
  // angle will be an ongoing incremental flag. Sin and Cos functions will be
  // applied to it to create vertical and horizontal movements of the flakes
  var angle = 0;

  function update() {

    angle += 0.01;

    for (var i = 0; i < mp; i++) {
      var p = particles[i];

      // Updating X and Y coordinates
      // We will add 1 to the cos function to prevent negative values which will
      // lead flakes to move upwards
      // Every particle has its own density which can be used to make the
      // downward movement different for each flake
      // Lets make it more random by adding in the radius

      p.y += Math.cos(angle + p.d) + 1 + p.r / 2;
      p.x -= (superSpeed);

      // p.x += - Math.abs(Math.sin(angle)) * 2 - superSpeed;

      // Sending flakes back from the top when it exits
      // Lets make it a bit more organic and let flakes enter from the left and
      // right also.
      if (p.x > W + 5 || p.x < -5 || p.y > H) {
        if (i % 3 > 0) {
          // 66.67% of the flakes

          particles[i] = {x: Math.random() * W, y: -10, r: p.r, d: p.d};
        } else {
          var newX;
          var newY;

          //If the flake is exitting from the right
          if (Math.sin(angle) > 0) {
            //Enter from the left
            newX = W + Math.random() * W;
            newY = Math.random() * H;
          } else {
            //Enter from the right
            newX = W + Math.random() * W;
            newY = H / 4 + Math.random() * H / 2;
          }

          particles[i] = {x: newX, y: newY, r: p.r, d: p.d};
        }
      }
    }
  }

  // animation loop
  draw();
};
