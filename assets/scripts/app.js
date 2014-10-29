(function () {
  'use strict';

  var app = angular.module('windTurbineApp', ['turbine-directives', 'ngBootstrap', 'angular-rickshaw']);

  app.controller('turbineController', ['$scope', '$http', function($scope, $http) {
    $scope.rotationSpeed = 10;

    this.graph = {};
    this.currentPercentage = 0;
    this.speed = 0;
    this.wattage = 0;
    this.displayDate = new Date();

    this.hoverDeets = {};

    $scope.prevSpeed = 0;

    this.usageExamples = [
      { "action": "That's enough to power", "consumption": 0.00483, "object": "homes", "image": "house" },
      { "action": "Or enough to boil the water for", "consumption": 0.000016, "object": "cups of tea", "image": "tea" },
      { "action": "Or making", "consumption": 0.000033, "object": "slices of toasts", "image": "toast" }
    ];

    this.updateStats = function(x, y, percent) {
      // demand is never under 20,000 and wind is always under 4,000
      // this is a way to make sure the turbine doesn't rotate at
      // the demand rate
      var speed = y/500;

      $scope.prevSpeed = speed;

      animateWindMill(speed, percent);

      this.wattage = y;
      this.displayDate = new Date(x * 1000);
      this.isCurrent = (new Date() - this.displayDate) / 60000 < 30; // if details is from less than 30 mins ago

      this.currentPercentage = percent;

      this.showExample = Math.round(Math.random() * (this.usageExamples.length-2)) + 1;

      return y + 'MW';
    };

    this.setStats = function() {
      this.updateStats(this.hoverDeets.x, this.hoverDeets.y, this.hoverDeets.z);
    };

    var hoverGraph = function(series, x, y, z, a, b, c) {
      this.hoverDeets.x = x;
      this.hoverDeets.y = y;
      this.hoverDeets.z = b.value.z;

      return y + 'MW';
    },
    graphSetup = function(transport) {

    },
    animateWindMill = function(speed, percent) {
      var $rContainer = $('#turbine-rotor-container'),
        $rotor = $('#turbine-rotor').eq(0),
        $rotorP = $('#turbine-percentage-complete').eq(0),
        valueS = 13 / speed,
        value = valueS + 's',
        degPerS = speed*1.9,
        oldTransform = matrixToDeg($rotor.css('transform')),
        parentTransform = matrixToDeg($rContainer.css('transform'));

      if( speed === 0 ){
        value = '3000000s';
      }

      $scope.rotationSpeed = value;

      $rotor.removeClass('animated').hide();
      $rContainer.css('transform', 'rotateZ(' + (oldTransform+parentTransform+degPerS) + 'deg)');

      setTimeout(function() {
        $rotor.addClass('animated').show();
      }, 0);
    },
    matrixToDeg = function(tr) {
      var angle = 0;

      if( tr !== 'none' ) {
        var values = tr.split('(')[1];
        values = values.split(')')[0];
        values = values.split(',');

        var a = values[0],
          b = values[1],
          c = values[2],
          d = values[3],
          scale = Math.sqrt(a*a + b*b);

        var radians = Math.atan2(b, a);

        if ( radians < 0 ) {
          radians += (2 * Math.PI);
        }

        angle = Math.round( radians * (180/Math.PI));
      }

      return angle;
    };


    this.graph.options = {
      renderer: 'area',
      height: 200,
    };

    this.graph.features = {
      hover: {
        formatter: hoverGraph.bind(this),
        xFormatter: function(x) {
            var now = moment().format('X'),
              time = '';

            if( now - x > 6*24*3600) {
              time = moment.unix(x).format('LLL');
            } else {
              time = moment.unix(x).calendar();
            }
            return time;
        }
      },
      yAxis: {
      },
      xAxis: {
        timeFixture: new Rickshaw.Fixtures.Time.Local()
      },
      complete: graphSetup.bind(this)
    };

    this.graph.series = [{"name":"Wind","color":'#007232',"data":[{"x":0,"y":0}]}];
    this.daterange = { startDate: moment().subtract('days', 7), endDate: moment() };

    $scope.loadInData = function() {
      if( typeof(this.daterange) !== 'undefined' ) {
        var that = this;

        $http.get('./json/', { params: { start: this.daterange.startDate.unix(), end: this.daterange.endDate.unix()}})
          .success(function(data) {
            that.graph.series = data;
            var lastValue = data[0].data.pop();

            that.updateStats(lastValue.x, lastValue.y, lastValue.z);
          });
      }

    }.bind(this);

    $scope.$watch(function() { return this.daterange; }.bind(this), function() {
      $scope.loadInData();
    });

  }]);

})();