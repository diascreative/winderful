$('form').one("submit", function(event) {
  event.preventDefault();

  var send = {
      datetimepicker_end: $('#datetimepicker_end').data('xdsoft_datetimepicker').data('xdsoft_datetime').strToDateTime($('#datetimepicker_end').val()).dateFormat('unixtime'),
      datetimepicker_start: $('#datetimepicker_start').data('xdsoft_datetimepicker').data('xdsoft_datetime').strToDateTime($('#datetimepicker_start').val()).dateFormat('unixtime')
    };

  $.ajax({
    type: 'GET',
    url: './download.php',
    data: send,
    dataType: 'json',
    success: function(obj) {
      var value = obj[0];

        $("ul").append("<li>" + "Demand for power is " + value.demand + "GW" + "</li>");
        $("ul").append("<li>" + "Wind Power supplies " + value.wind + "GW" + "</li>");
        $("ul").append("<li>" + "Wind Power accounts for around " + ((value.wind / value.demand) * 100).toFixed(2) + "%" + " of the total Energy Supply" + "</li>");

        var wind = ((value.wind / value.demand) * 100).toFixed(2); // need this to be the output of our JSON func, ((value.wind / value.demand) * 100).toFixed(2)

        if (wind <= 3) {
          $('.rotor').css('-webkit-animation', 'rotate 40s infinite linear');
        }
        else if (wind > 3 && wind <= 8) {
          $('.rotor').css('-webkit-animation', 'rotate 20s infinite linear');
        }
        else {
          $('.rotor').css('-webkit-animation', 'rotate 2s infinite linear');
        }
      },
    error: function() {
      alert('Error');
    }
  });
});

$('#datetimepicker_start').datetimepicker();
$('#datetimepicker_end').datetimepicker();