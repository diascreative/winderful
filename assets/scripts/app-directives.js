(function() {
  var app = angular.module('turbine-directives', []);

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
})();