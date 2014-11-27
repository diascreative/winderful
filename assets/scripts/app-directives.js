/* global $:false,
    angular: false
*/
(function() {
  var app = angular.module('turbine-directives', []);

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