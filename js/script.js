$('button').one( "click", function() {
  $.getJSON( "../power/json/grid_watch_a.json", function(obj) {
    $.each(obj, function(key, value){
      $("ul").append("<li>" + "Demand for power is " + value.demand + "GW" + "</li>"),
      $("ul").append("<li>" + "Wind Power supplies " + value.wind + "GW" + "</li>"),
      $("ul").append("<li>" + "Wind Power accounts for around " + ((value.wind / value.demand) * 100).toFixed(2) + "%" + " of the total Energy Supply" + "</li>")
    });
  });
});



