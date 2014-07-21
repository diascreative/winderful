(function ($, doc) {
  'use strict';

  var $rotor = $('#turbine-rotor').eq(0),
    rotationAngle = 0,
    speed = 0.5,
    graph = new Rickshaw.Graph.Ajax({
      element: doc.getElementById("chart"),
      width: 600,
      height: 500,
      stroke: true,
      renderer: 'bar',
      dataURL: './json/',
      onData: function(d) {
        d[0].data[0].y = 80;
        return d;
      },
      onComplete: function(transport) {
        var graph = transport.graph;

        graph.offset = 'pct';

        var detail = new Rickshaw.Graph.HoverDetail({ graph: graph,
          yFormatter: function(y) {

            speed = y/1000;

            return y;
          }}),
          shelving = new Rickshaw.Graph.Behavior.Series.Toggle( {
                        graph: graph,
                        legend: {}
                      }),
          axes = new Rickshaw.Graph.Axis.Time( {
                        graph: graph
                      });

        axes.render();

      },
      series: [
        {
          name: 'Wind',
          color: '#491D37'
        }
      ]
    }),
    getData = function(url){
      graph.dataURL = url;
	    graph.request();
    },
    animateWindMill = function() {
      rotationAngle += speed;

      if( rotationAngle > 360 ) {
        rotationAngle -= 360;
      }

      var value = 'rotateZ(' + rotationAngle + 'deg)';

      $rotor.css({
          '-webkit-transform': value,
          '-moz-transform': value,
          '-ms-transform': value,
          '-o-transform': value,
          'transform': value
        });

      requestAnimationFrame(animateWindMill);
    };

  animateWindMill();


  // form
  $('#form').submit(function(e) {
    e.preventDefault();

    var getVars = {
      end: $('#end').data('xdsoft_datetimepicker').data('xdsoft_datetime').strToDateTime($('#end').val()).dateFormat('unixtime'),
      start: $('#start').data('xdsoft_datetimepicker').data('xdsoft_datetime').strToDateTime($('#start').val()).dateFormat('unixtime')
    };

    var url = $(this).attr('action') + '?' + $.param(getVars);

    getData(url);
  });

  $('#start').datetimepicker({
    minDate:'2009/05/14',
    formatTime: 'H.i',
    maxDate:'0'
  });


  $('#end').datetimepicker({
    formatTime: 'H.i',
    minDate:'2009/05/14',
    maxDate:'#datetimepicker_start'
  });

}(jQuery, document));