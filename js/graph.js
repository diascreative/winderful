(function () {
  'use strict';

  var $rotor = $('#rotor').eq(0),
    rotationAngle = 0,
    speed = .5,
    graph = new Rickshaw.Graph.Ajax({
      element: document.getElementById("chart"),
      width: 960,
      height: 500,
      stroke: true,
      renderer: 'bar',
      dataURL: './json/index.php',
      onData: function(d) {
        d[0].data[0].y = 80;
        return d;
      },
      onComplete: function(transport) {
        graph = transport.graph;

        graph.offset = 'pct';

        var detail = new Rickshaw.Graph.HoverDetail({ graph: graph,
          yFormatter: function(y) {

            speed = y/1000;

            return y;
          }}),
          shelving = new Rickshaw.Graph.Behavior.Series.Toggle( {
                        graph: graph,
                        legend: legend
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

}());