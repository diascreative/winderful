(function (angular) {
  'use strict';

  var app = angular.module('windTurbineApp', ['ngBootstrap', 'angular-rickshaw']);

  app.controller('turbineController', ['$scope', function($scope) {
    $scope.rotationSpeed = 10;

    this.graph = {};
    this.currentPercentage = 0;
    this.speed = 0;
    this.wattage = 0;
    this.displayDate = new Date();

    $scope.prevSpeed = 0;

    this.usageExamples = [
      { "action": "powering", "name": "homes for an entire day", "consumption": 4600000 / 365 },
      { "action": "making", "name": "toasts", "consumption": 800 }
    ];

    $scope.loadInData = function() {
      this.graph.series = [{"name":"Wind","color":'#29abe2',"data":[{"x":1412862603,"y":3306},{"x":1412863203,"y":3264},{"x":1412866804,"y":3467},{"x":1412870402,"y":3429},{"x":1412874002,"y":3236},{"x":1412877602,"y":3184},{"x":1412881202,"y":3169},{"x":1412884802,"y":2826},{"x":1412888405,"y":2796},{"x":1412892004,"y":2948},{"x":1412895602,"y":2838},{"x":1412899201,"y":2966},{"x":1412902805,"y":2955},{"x":1412906405,"y":2551},{"x":1412910003,"y":2530},{"x":1412913605,"y":2334},{"x":1412917201,"y":1901},{"x":1412920804,"y":1547},{"x":1412924401,"y":1451},{"x":1412928003,"y":1337},{"x":1412931603,"y":1490},{"x":1412935202,"y":1588},{"x":1412938804,"y":1715},{"x":1412942415,"y":1748},{"x":1412946007,"y":2010},{"x":1412950202,"y":0},{"x":1412953215,"y":1610},{"x":1412956824,"y":1331},{"x":1412960411,"y":1729},{"x":1412964029,"y":1343},{"x":1412967632,"y":1181},{"x":1412971232,"y":1168},{"x":1412974827,"y":1131},{"x":1412978743,"y":803},{"x":1412982002,"y":761},{"x":1412985606,"y":533},{"x":1412989236,"y":446},{"x":1412992802,"y":709},{"x":1412996401,"y":0},{"x":1413000003,"y":0},{"x":1413003602,"y":0},{"x":1413007202,"y":621},{"x":1413010803,"y":602},{"x":1413014402,"y":630},{"x":1413018002,"y":504},{"x":1413021603,"y":273},{"x":1413025202,"y":264},{"x":1413028803,"y":344},{"x":1413032403,"y":473},{"x":1413036003,"y":546},{"x":1413039605,"y":666},{"x":1413043202,"y":479},{"x":1413046803,"y":622},{"x":1413050402,"y":857},{"x":1413054003,"y":887},{"x":1413057602,"y":851},{"x":1413061204,"y":827},{"x":1413064803,"y":728},{"x":1413068402,"y":714},{"x":1413072002,"y":533},{"x":1413075602,"y":421},{"x":1413079202,"y":368},{"x":1413082803,"y":323},{"x":1413086406,"y":284},{"x":1413090001,"y":261},{"x":1413093602,"y":285},{"x":1413097202,"y":246},{"x":1413100802,"y":239},{"x":1413104403,"y":237},{"x":1413108001,"y":280},{"x":1413111605,"y":242},{"x":1413115204,"y":231},{"x":1413118801,"y":326},{"x":1413122401,"y":495},{"x":1413126004,"y":677},{"x":1413129603,"y":1057},{"x":1413133203,"y":1362},{"x":1413136805,"y":1359},{"x":1413140403,"y":1748},{"x":1413144002,"y":1938},{"x":1413147602,"y":2018},{"x":1413151205,"y":2153},{"x":1413154804,"y":2229},{"x":1413158404,"y":2382},{"x":1413162002,"y":2576},{"x":1413165605,"y":2564},{"x":1413169205,"y":2667},{"x":1413172801,"y":2501},{"x":1413176401,"y":2550},{"x":1413180003,"y":2822},{"x":1413183603,"y":2811},{"x":1413187203,"y":3007},{"x":1413190802,"y":2966},{"x":1413194409,"y":2982},{"x":1413198003,"y":3195},{"x":1413201604,"y":3547},{"x":1413205201,"y":3556},{"x":1413208803,"y":3537},{"x":1413212404,"y":3613},{"x":1413216002,"y":3988},{"x":1413219602,"y":3874},{"x":1413223202,"y":3743},{"x":1413226801,"y":3735},{"x":1413230406,"y":3870},{"x":1413234003,"y":3646},{"x":1413237602,"y":3824},{"x":1413241203,"y":3590},{"x":1413244802,"y":3167},{"x":1413248406,"y":2850},{"x":1413252002,"y":2379},{"x":1413255602,"y":2303},{"x":1413259201,"y":2200},{"x":1413262802,"y":2197},{"x":1413266403,"y":2038},{"x":1413270004,"y":2019},{"x":1413273602,"y":2037},{"x":1413277205,"y":1918},{"x":1413280802,"y":1961},{"x":1413284406,"y":2006},{"x":1413288005,"y":1649},{"x":1413291604,"y":1569},{"x":1413295205,"y":1519},{"x":1413298804,"y":1572},{"x":1413302402,"y":1331},{"x":1413306003,"y":1187},{"x":1413309602,"y":1197},{"x":1413313205,"y":1747},{"x":1413316802,"y":1798},{"x":1413320404,"y":1651},{"x":1413324002,"y":1280},{"x":1413327602,"y":1409},{"x":1413331202,"y":1402},{"x":1413334802,"y":1243},{"x":1413338403,"y":1407},{"x":1413342003,"y":1332},{"x":1413345601,"y":1338},{"x":1413349202,"y":1533},{"x":1413352802,"y":1730},{"x":1413356402,"y":1767},{"x":1413360004,"y":1920},{"x":1413363602,"y":1916},{"x":1413367202,"y":2200},{"x":1413370802,"y":2406},{"x":1413374402,"y":2636},{"x":1413378002,"y":2931}]}];
    }.bind(this);
    //this.daterange = { "startDate": "2013-09-19T22:00:00.000Z", "endDate": "2013-09-24T22:00:00.000Z" };
    //this.daterange = moment().range('2012-11-05', '2013-01-25');

    var hoverGraph = function(series, x, y) {
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
    },
    graphSetup = function(transport) {
      var wind_test = (this.graph.series[0].data.pop());
      var demand_test = (this.graph.series[1].data.pop());
      this.currentPercentage = (wind_test.y)/(demand_test.y) * 100;
    },
    animateWindMill = function(speed) {
      var $rContainer = $('#turbine-rotor-container');
      var $rotor = $('#turbine-rotor').eq(0);

      var valueS = (11 - speed),
        value = valueS + 's',
        degPerS = 360/(valueS*40),
        oldTransform = matrixToDeg($rotor.css('transform')),
        parentTransform = matrixToDeg($rContainer.css('transform'));

      if( speed === 0 ){
        value = '3000000s';
      }

      $scope.rotationSpeed = value;
      $scope.$digest();

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
      // xAxis: {
      //   timeFixture: new Rickshaw.Fixtures.Time.Local()
      // },
      complete: graphSetup.bind(this)
    };

    this.graph.series = [{"name":"Wind","color":'#29abe2',"data":[{"x":0,"y":0}]}];

    $scope.loadInData();

  }]);

  app.directive('parseStyle', ['$interpolate', function($interpolate) {
    return function(scope, elem) {
      var exp = $interpolate(elem.html()),
        watchFunc = function () { return exp(scope); };

      scope.$watch(watchFunc, function (html) {
        elem.html(html);
      });
    };
  }]);

  app.directive('turbine', function() {
    return {
      restrict: 'E',
      templateUrl: './templates/turbine.html'
    };
  });

  app.directive('turbineStats', function() {
    return {
      restrict: 'E',
      templateUrl: './templates/turbine-stats.html'
    };
  });

})(angular);