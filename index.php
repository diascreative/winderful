<?php
  $domain = $_SERVER[HTTP_HOST];
  $url = "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
?>
<!doctype html>
<html lang="en" dir="ltr" ng-app="windTurbineApp">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>

    <title>Winderful</title>

    <meta name="title" content="Winderful"/>
    <meta name="keywords" content="windenergy, uk, sustainable, sustainability, wind, energy, animated turbine, wind turbine"/>
    <meta name="description" content="Winderful is an experiment using realtime data to visualise and tell stories about wind energy."/>

    <!-- Facebook metas -->
    <meta property="og:title" content="Winderful'"/>
    <meta property="og:type" content="website"/>
    <meta property="og:site_name" content="<?= $domain ?>"/>
    <meta property="og:image" content="http://<?= $domain ?>/static/img/screenshot.png"/>

    <!-- Twitter metas -->
    <meta name="twitter:card" content="photo" />
    <meta name="twitter:site" content="@diascreative" />
    <meta name="twitter:title" content="Winderful" />
    <meta name="twitter:description" content="Winderful is an experiment using realtime data to visualise and tell stories about wind energy." />
    <meta name="twitter:image" content="http://<?= $domain ?>/static/img/screenshot.png" />
    <meta name="twitter:url" content="<?= $url ?>" />


    <meta name="apple-mobile-web-app-capable" content="yes"/>
    <meta name="viewport" content="width=device-width, user-scalable=no">

    <link rel="stylesheet" type="text/css"
      href="http://fonts.googleapis.com/css?family=Roboto:300,300italic,400italic,400,500,500italic">
    <link rel="stylesheet" type="text/css" href="./static/css/wind.css">
  </head>
  <body ng-controller="turbineController as turbine">
    <div class="wrapper">
      <div class="left-side">
        <h1>
          <img src="./static/img/logo.svg" alt="Winderful"
             width="266" height="66">
        </h1>
        <h2>Visualising the UK's wind energy</h2>

        <p>
          Winderful helps quantify the UK's wind energy and translate it into
          useful everyday goodness.
        </p>

        <form id="form" action="./json" method="get">
          <label>Choose a date range/</label>

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

      <div id="social">
        <a title="Share on Facebook" target="_blank"
          href="http://www.facebook.com/sharer.php?u=<?= $url ?>">
          <img src="./static/img/fb.svg" alt="Share on Facebook"
            height="48" width="48">
        </a>

        <a title="Share on Twitter" target="_blank"
          href="http://twitter.com/share?text=Winderful+-+visualising+UK's+%23windenergy+in+real+time.+Made+by+@diascreative&amp;url=<?= $url ?>">
          <img src="./static/img/twitter.svg" alt="Share on Twitter"
            height="48" width="48">
        </a>
      </div>

      <div class="push"></div>
    </div>

    <rickshaw id="chart-container"
      rickshaw-options="turbine.graph.options"
      rickshaw-features="turbine.graph.features"
      rickshaw-series="turbine.graph.series"
      ng-click="turbine.setStats()">
    </rickshaw>

    <turbine></turbine>

    <div id="tip">
      Click the hills for more detail
    </div>

    <section id="about" turbine-about></section>

    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
    <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.2.26/angular.min.js"></script>
    <script src="./static/js/libs.js"></script>
    <script src="./static/js/app.js"></script>

    <script type="text/javascript">
      $('#social a').on('click', function(e) {
        e.preventDefault();

        var w = 600,
          h = 500,
          left = (screen.width/2) - (w/2),
          top = (screen.height/2) - (h/2),
          url = $(this).attr('href');

        window.open (url, 'win', 'menubar=0,resizable=1,width=' + w +
                                                    ', height=' + w + ', top=' + top + ', left=' + left);
      });
    </script>
  </body>
</html>