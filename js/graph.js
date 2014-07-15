(function () {
  'use strict';

  var graph = new Rickshaw.Graph.Ajax({
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

      var detail = new Rickshaw.Graph.HoverDetail({ graph: graph }),
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
      {
        name: 'Demand',
        color: '#2F254A'
      }
    ]
  });

}());