$('button').one( "click", function() {
  $.getJSON( "../power/json/grid_watch_a.json", function(obj) {

    $.each(obj, function(key, value){
      $("ul").append("<li>" + "Demand for power is " + value.demand + "GW" + "</li>"),
      $("ul").append("<li>" + "Wind Power supplies " + value.wind + "GW" + "</li>"),
      $("ul").append("<li>" + "Wind Power accounts for around " + ((value.wind / value.demand) * 100).toFixed(2) + "%" + " of the total Energy Supply" + "</li>")
    });
  });
});

$(document).ready(function() {

  var wind = 10; // need this to be the output of our JSON func, ((value.wind / value.demand) * 100).toFixed(2)

      if (wind <= 1) {
        $('.rotor').css('-webkit-animation', 'rotate 30s infinite linear');
      }
      else if (wind > 1 && wind <= 2) {
        $('.rotor').css('-webkit-animation', 'rotate 15s infinite linear');
      }
      else {
        $('.rotor').css('-webkit-animation', 'rotate 3s infinite linear');
      }
});