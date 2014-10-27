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

    $scope.prevSpeed = 0;

    this.usageExamples = [
      { "action": "powering", "name": "homes for an entire day", "consumption": 0.00483 },
      { "action": "making", "name": "toasts", "consumption": 0.000033 },
      { "action": "making", "name": "cups of tea", "consumption": 0.000016 }
    ];

    this.updateStats = function(x, y) {
      if( y < 15000 ) {
        // demand is never under 20,000 and wind is always under 4,000
        // this is a way to make sure the turbine doesn't rotate at
        // the demand rate
        var speed = y/500;

        if( speed !==  $scope.prevSpeed ) {
          $scope.prevSpeed = speed;
          animateWindMill(speed);

          this.wattage = y;
          this.displayDate = new Date(x * 1000);
        }
      }

      return y + 'MW';
    };

    var hoverGraph = function(series, x, y) {
      var y = this.updateStats(x, y);

      $scope.$digest();

      return y;
    },
    graphSetup = function(transport) {
      var wind_test = (this.graph.series[0].data.pop());
      var demand_test = (this.graph.series[1].data.pop());
      this.currentPercentage = (wind_test.y)/(demand_test.y) * 100;
    },
    animateWindMill = function(speed) {
      var $rContainer = $('#turbine-rotor-container');
      var $rotor = $('#turbine-rotor').eq(0);

      var valueS = 13 / speed,
        value = valueS + 's',
        degPerS = 360/(valueS*40),
        oldTransform = matrixToDeg($rotor.css('transform')),
        parentTransform = matrixToDeg($rContainer.css('transform'));

      if( speed === 0 ){
        value = '3000000s';
      }

      $scope.rotationSpeed = value;

      $rContainer.css('transform', 'rotateZ(' + (oldTransform+parentTransform+degPerS) + 'deg)');
      $rotor.removeClass('animated');

      setTimeout(function() {
        $rotor.addClass('animated');
      }, 2);
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
      height: 100,
    };

    this.graph.features = {
      hover: {
        formatter: hoverGraph.bind(this)
      },
      xAxis: {
        timeFixture: new Rickshaw.Fixtures.Time.Local()
      },
      complete: graphSetup.bind(this)
    };

    this.graph.series = [{"name":"Wind","color":'#29abe2',"data":[{"x":0,"y":0}]}];
    this.daterange = { startDate: moment().subtract('days', 7), endDate: moment() };

    $scope.loadInData = function() {
      if( typeof(this.daterange) !== 'undefined' ) {
        var that = this;

        $http.get('./json/', { params: { start: this.daterange.startDate.unix(), end: this.daterange.endDate.unix()}})
          .success(function(data) {
            that.graph.series = data;
            var lastValue = data[0].data.pop();

            that.updateStats(lastValue.x, lastValue.y);
          });
      }

    }.bind(this);

    $scope.$watch(function() { return this.daterange; }.bind(this), function() {
      $scope.loadInData();
    });

  }]);

})();