(function() {
  var app = angular.module('turbine-directives', []);

  app.directive('turbine', function() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: './templates/turbine.html'
    };
  });

  app.directive('turbineStats', function() {
    return {
      restrict: 'E',
      templateUrl: './templates/turbine-stats.html'
    };
  });

  app.directive('turbineAbout', function() {
    return {
      restrict: 'A',
      templateUrl: './templates/turbine-about.html'
    };
  });
})();