(function ($, doc) {
  'use strict';

  // graph /////////////////////////////////////////////////////////////////////
  //
  var diasGraph = {
    speed: 0.5,
    prevSpeed: 0.5,
    rotationAngle: 0,
    graph: false,
    animationTransition: null,
    init: function() {
      this.cacheItems();

      this.graph = new Rickshaw.Graph.Ajax({
        element: doc.getElementById("chart"),
        width: 600,
        height: 500,
        stroke: true,
        renderer: 'bar',
        //offset: 'expand',
        dataURL: './json/',
        onData: function(d) {
          d[0].data[0].y = 80;
          return d;
        },
        onComplete: this.graphSetup.bind(this),
        series: [
          {
            name: 'Wind',
            color: '#491D37'
          },
          {
            name: 'Demand',
            color: '#963'
          }
        ]
      });
    },
    cacheItems: function() {
      this.$rContainer = $('#turbine-rotor-container');
      this.$rotor = $('#turbine-rotor').eq(0);
      this.$legend = $('#legend');
      this.$css = $('<style type="text/css" id="turbine-css"></style>');

      $('head').append(this.$css);
    },
    graphSetup: function(transport) {
      var graph = transport.graph,
        detail = new Rickshaw.Graph.HoverDetail({ graph: graph,
          yFormatter: this.hoverGraph.bind(this)

        });

      var wind_test = (graph.series[0].data.pop());
      var demand_test = (graph.series[1].data.pop());
      var test_percent = (wind_test.y)/(demand_test.y) * 100;
      $('#percent').html(test_percent.toFixed(2));
      this.setLegend(graph);

      // var slider = new Rickshaw.Graph.RangeSlider.Preview({
      //   graph: graph,
      //   element: document.querySelector('#slider')
      // });
    },
    setLegend: function(graph) {
      this.$legend.html('');

      var legend = new Rickshaw.Graph.Legend({
        graph: graph,
        element: this.$legend[0]
      });
    },
    hoverGraph: function(y) {
      if( y < 15000 ) {
        // demand is never under 20,000 and wind is always under 4,000
        // this is a way to make sure the turbine doesn't rotate at
        // the demand rate
        this.speed = y/1000;

        if( this.speed !==  this.prevSpeed ) {
          this.prevSpeed = this.speed;

          this.animateWindMill();
        }
      }

      return y + " MW";
    },
    getData: function(url){
      this.graph.dataURL = url;
      this.graph.request();
    },
    animateWindMill: function() {
      var value = (6 - this.speed) + 's',
        oldTransform = this.$rotor.css('transform'),
        newCSS = '#turbine-rotor.animated {' +
          '-webkit-animation-duration:' + value + ';' +
          '-moz-animation-duration:' + value + ';' +
          '-ms-animation-duration:' + value + ';' +
          '-o-animation-duration:' + value + ';' +
          'animation-duration:' + value + '}';

      this.$css.html(newCSS);

      this.$rContainer.css('transform', oldTransform);
      this.$rotor.removeClass('animated');

      setTimeout(function() {
        this.$rotor.addClass('animated');
      }.bind(this), 10);
    }
  };

  //
  // graph end /////////////////////////////////////////////////////////////////



  // form //////////////////////////////////////////////////////////////////////
  //
  var dateForm = {
    values: { start: '', end: '' },
    init: function() {
      this.cacheItems();
      this.bindEvents();
    },
    cacheItems: function() {
      this.$form = $('#form');
      this.$start = $('#start');
      this.$end = $('#end');
    },
    bindEvents: function() {
      var that = this;

      $('#form').submit(this.submitForm.bind(this));

      $('#start').datetimepicker({
        formatTime: 'H.i',
        minDate: '2009/05/14',
        onChangeDateTime: this.updateStartTime.bind(this),
        onShow: function() {
          var maxDate = that.dateOption(that.$end, '+1970/01/01');

          this.setOptions({ maxDate: maxDate });
        }
      });

      $('#end').datetimepicker({
        formatTime: 'H.i',
        maxDate: '+1970/01/01',
        onChangeDateTime: this.updateEndTime.bind(this),
        onShow: function() {

          var minDate = that.dateOption(that.$start, '2009/05/14');

          this.setOptions({ minDate: minDate });
        }
      });
    },
    dateOption: function($input, defaultValue) {
      var newDate = $input.val() ? $input.val() : defaultValue,
        isDateTime = newDate.split(' ');

      if ( isDateTime.length > 1 ) {
        newDate = isDateTime[0];
      }

      return newDate;
    },
    updateStartTime: function(newStartTime) {
      this.values.start = newStartTime && typeof newStartTime !== 'undefined' ? newStartTime.dateFormat('unixtime') : '';
    },
    updateEndTime: function(newEndTime) {
      this.values.end = newEndTime && typeof newEndTime !== 'undefined' ? newEndTime.dateFormat('unixtime') : '';
    },
    submitForm: function(e) {
        e.preventDefault();

        var url = this.$form.attr('action') + '?' + $.param(this.values);

        diasGraph.getData(url);
    }

  };

  //
  // form end //////////////////////////////////////////////////////////////////

  diasGraph.init();
  dateForm.init();

}(jQuery, document));