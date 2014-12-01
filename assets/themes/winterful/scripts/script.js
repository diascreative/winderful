/* We need to tell jshint which are our global variables */
/* global $:false,
    document: false,
    window: false
*/

var theme = {},
  superSpeed = 0;

theme.onUpdate = function(power) {
  superSpeed = power / 1000;
};

theme.usageExamples = [
      { "action": "Powering", "consumption": 0.000483, "object": "homes", "image": "North Pole homes" },
      { "action": "Or driving", "consumption": 0.00038, "object": "miles in a Santa Sled" },
      { "action": "Or watching \"How the Grinch Stole Christmas!\"", "consumption": 0.000024, "object": "times" }
    ];

window.onload = function(){
  //canvas init
  var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext('2d');

  //canvas dimensions
  var W = window.innerWidth;
  var H = window.innerHeight;
  canvas.width = W;
  canvas.height = H;

  //snowflake particles
  var mp = 512; //max particles
  var particles = [];
  for(var i = 0; i < mp; i++)
  {
    particles.push({
      x: Math.random()*W, //x-coordinate
      y: Math.random()*H, //y-coordinate
      r: Math.random()*4+1, //radius
      d: Math.random()*mp //density
    });
  }

  //Lets draw the flakes
  function draw()
  {
    ctx.clearRect(0, 0, W, H);

    ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
    ctx.beginPath();
    for(var i = 0; i < mp; i++)
    {
      var p = particles[i];
      ctx.moveTo(p.x, p.y);
      ctx.arc(p.x, p.y, p.r, 0, Math.PI*2, true);
    }
    ctx.fill();
    update();

    window.requestAnimationFrame(draw);
  }

  //Function to move the snowflakes
  //angle will be an ongoing incremental flag. Sin and Cos functions will be applied to it to create vertical and horizontal movements of the flakes
  var angle = 0;
  function update()
  {
    angle += 0.01;
    for(var i = 0; i < mp; i++)
    {
      var p = particles[i];
      //Updating X and Y coordinates
      //We will add 1 to the cos function to prevent negative values which will lead flakes to move upwards
      //Every particle has its own density which can be used to make the downward movement different for each flake
      //Lets make it more random by adding in the radius
      p.y += Math.cos(angle+p.d) + 1 + p.r/2;
      p.x -= (superSpeed);
      // p.x += - Math.abs(Math.sin(angle)) * 2 - superSpeed;

      //Sending flakes back from the top when it exits
      //Lets make it a bit more organic and let flakes enter from the left and right also.
      if(p.x > W+5 || p.x < -5 || p.y > H)
      {
        if(i%3 > 0) //66.67% of the flakes
        {
          particles[i] = {x: Math.random()*W, y: -10, r: p.r, d: p.d};
        }
        else
        {
          //If the flake is exitting from the right
          if(Math.sin(angle) > 0)
          {
            //Enter from the left
            particles[i] = {x: W + Math.random()*W, y: Math.random()*H, r: p.r, d: p.d};
          }
          else
          {
            //Enter from the right
            // particles[i] = {x: W + Math.random()*W, y: Math.random()*H, r: p.r, d: p.d};
            particles[i] = {x: W + Math.random()*W, y: H/4 + Math.random()*H/2, r: p.r, d: p.d};
          }
        }
      }
    }
  }

  //animation loop
  draw();
};
