$('button').one( "click", function() {
  $.getJSON( "./json/grid_watch_a.json", function(obj) {
    var value = obj[0];
      $("ul").append("<li>" + "Demand for power is " + value.demand + "GW" + "</li>");
      $("ul").append("<li>" + "Wind Power supplies " + value.wind + "GW" + "</li>");
      $("ul").append("<li>" + "Wind Power accounts for around " + ((value.wind / value.demand) * 100).toFixed(2) + "%" + " of the total Energy Supply" + "</li>");

      var wind = ((value.wind / value.demand) * 100).toFixed(2); // need this to be the output of our JSON func, ((value.wind / value.demand) * 100).toFixed(2)

      if (wind <= 1) {
        $('.rotor').css('-webkit-animation', 'rotate 30s infinite linear');
      }
      else if (wind > 1 && wind <= 2) {
        $('.rotor').css('-webkit-animation', 'rotate 10s infinite linear');
      }
      else {
        $('.rotor').css('-webkit-animation', 'rotate 3s infinite linear');
      }
  });
});


