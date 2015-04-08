/* global $:false,
    angular: false
*/
(function() {
  var app = angular.module('winderful-filters', []);

  // Filter for translating consumption to equivalent in the stats
  app.filter('equivalent', ['$filter', function($filter) {
    return function(consumption) {
      // make sure we don't divide by 0,
      // consumption should never be 0, what a magical world that would be!
      // if consumption is 0 we're just going to not power any
      var amount = consumption > 0 ? this.wattage / consumption : 0;

      return $filter('number')(amount, 0);
    };
  }]);

})();
