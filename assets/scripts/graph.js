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
      //offset: 'expand',
      dataURL: './json/',
      onData: function(d) {
        d[0].data[0].y = 80;
        return d;
      },
      onComplete: function(transport) {
        var graph = transport.graph;

        var detail = new Rickshaw.Graph.HoverDetail({ graph: graph,
          yFormatter: function(y) {

            if( y < 15000 ) {
              // demand is never under 20,000 and wind is always under 4,000
              // this is a way to make sure the turbine doesn't rotate at
              // the demand rate
              speed = y/1000;
            }

            return y;
          }});

        $('#legend').html('');

        var legend = new Rickshaw.Graph.Legend({
          graph: graph,
          element: $('#legend')[0]
        });

        // var slider = new Rickshaw.Graph.RangeSlider.Preview({
        //   graph: graph,
        //   element: document.querySelector('#slider')
        // });
      },
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

        getData(url);
    }

  };

  dateForm.init();

}(jQuery, document));