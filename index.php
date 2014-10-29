<!doctype html>
<html class="no-js" lang="en" ng-app="windTurbineApp">
  <head>
     <meta name="viewport" content="width=device-width">

    <link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family=Roboto:300,300italic,400italic,400,500,500italic">
    <link rel="stylesheet" type="text/css" href="./static/css/wind.css">
  </head>
  <body ng-controller="turbineController as turbine">
    <div class="wrapper">
      <div class="left-side">
        <h1><img src="./static/img/logo.svg" alt="Winderful" width="266" height="66"></h1>
        <h2>Visualising the UK's wind energy</h2>

        <p>
          Winderful helps quantify the UK's wind energy and translate it into useful everyday goodness.
        </p>

        <form id="form" action="./json" method="get">
          <label>Choose a date /</label>

          <input type="daterange" class="daterange"
            ng-model="turbine.daterange"
            min-date="2011-05-27"
            max-date="<?= date("Y-m-d") ?>"
            format="L"
            show-dropdowns="true">
        </form>
      </div>

      <div class="right-side">
        <turbine-stats></turbine-stats>
      </div>

      <turbine></turbine>
    </div>

    <rickshaw id="chart-container"
      rickshaw-options="turbine.graph.options"
      rickshaw-features="turbine.graph.features"
      rickshaw-series="turbine.graph.series"
      ng-click="turbine.setStats()">
    </rickshaw>

    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
    <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.2.26/angular.min.js"></script>
    <script src="./static/js/libs.js"></script>
    <script src="./static/js/app.js"></script>
  </body>
</html>