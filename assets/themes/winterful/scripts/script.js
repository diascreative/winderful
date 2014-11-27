'use strict';

/* We need to tell jshint which are our global variables */
/* global $:false,
    window: false,
    snowStorm: false // winterful only
*/

var theme = {};

theme.onStart = function() {
  // make sure that snowstorm uses the whole height
  snowStorm.flakeBottom = $(window).height();
};

theme.onUpdate = function(power) {
  snowStorm.windOffset = power/2000;
};

// snowStorm.flakesMaxActive = 100;           // Limit total amount of snow made (falling + sticking)
snowStorm.excludeMobile = true;      // Snow is likely to be bad news for mobile phones' CPUs (and batteries.) By default, be nice.
snowStorm.flakeBottom = null;        // Integer for Y axis snow limit, 0 or null for "full-screen" snow effect
snowStorm.followMouse = false;        // Snow movement can respond to the user's mouse
snowStorm.snowStick = false;          // Whether or not snow should "stick" at the bottom. When off, will never collect.
snowStorm.useMeltEffect = false;      // When recycling fallen snow (or rarely, when falling), have it "melt" and fade out if browser supports it
snowStorm.vMaxX = 2;                 // Maximum X velocity range for snow
snowStorm.vMaxY = 1.4;                 // Maximum Y velocity range for snow
snowStorm.flakeBottom = $(window).height();

