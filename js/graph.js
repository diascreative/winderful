(function () {
  'use strict';

  var $rotor = $('.rotor').eq(0),
    currentY = 0,
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

            var newSpeed = y/1000;

            currentY = y;

            setTimeout(function() {
              if( currentY === y ) {
                $rotor.css('-webkit-animation', '');

                setTimeout(function() {
                  $rotor.css('-webkit-animation', 'rotate ' + newSpeed + 's infinite linear');
                }, 10);
              }
            }, 100);


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
        },
        // {
        //   name: 'Demand',
        //   color: '#2F254A'
        // }
      ]
    });

}());