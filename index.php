<?php
  require_once("./inc/init.php");

  $version = '0.2.2';

  $domain = $_SERVER["HTTP_HOST"];
  $url = "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
?>
<!doctype html>
<html lang="en" dir="ltr" ng-app="windTurbineApp">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>

    <title>Winderful</title>

    <link rel="apple-touch-icon-precomposed" sizes="144x144" href="./apple-touch-icon-144x144.png" />
    <link rel="apple-touch-icon-precomposed" sizes="152x152" href="./apple-touch-icon-152x152.png" />
    <link rel="icon" type="image/png" href="./favicon-32x32.png" sizes="32x32" />
    <link rel="icon" type="image/png" href="./favicon-16x16.png" sizes="16x16" />
    <meta name="application-name" content="Winderful"/>
    <meta name="msapplication-TileColor" content="#005A6B" />
    <meta name="msapplication-TileImage" content="./mstile-144x144.png" />


    <meta name="title" content="Winderful"/>
    <meta name="keywords" content="windenergy, uk, sustainable, sustainability, wind, energy, animated turbine, wind turbine"/>
    <meta name="description" content="Winderful is an experiment using realtime data to visualise and tell stories about wind energy."/>

    <!-- Facebook metas -->
    <meta property="og:title" content="Winderful"/>
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

    <style type="text/css">
      <?php require_once('./static/css/above-fold.css'); ?>
    </style>

    <link rel="stylesheet" type="text/css"
      href="http://fonts.googleapis.com/css?family=Roboto:300,300italic,400italic,400,500,500italic">
    <link rel="stylesheet" type="text/css" href="./static/css/wind.css?v=<?= $version ?>">
  </head>
  <body ng-controller="turbineController as turbine" class="loading" ng-class="{ 'loading': !turbine.loaded }">
    <div id="loading" ng-hide="turbine.loaded">
      <div class="load-icon"></div>
    </div>

    <div class="wrapper">
      <nav id="nav">
        <a href="#about" class="scroll-to">About</a>

        <a title="Share on Facebook" class="social"
          href="http://www.facebook.com/sharer.php?u=<?= $url ?>">
          <img src="./static/img/fb.svg" alt="Share on Facebook"
            height="32" width="32">
        </a>

        <a title="Share on Twitter" class="twitter social"
          href="http://twitter.com/share?text=Winderful+-+visualising+UK's+%23windenergy+in+real+time.+Made+by+@diascreative&amp;url=<?= $url ?>">
          <img src="./static/img/twitter.svg" alt="Share on Twitter"
            height="32" width="32">
        </a>

        <a href="//diascreative.com" target="_blank">Made by DIAS_</a>
      </nav>

      <div class="left-side">
        <h1 id="main-title">Winderful</h1>

        <h2>A prototype visualising the UK's wind energy</h2>
      </div>

      <div class="right-side clearfix">
        <turbine-stats></turbine-stats>
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

    <div id="form">
      <label>Choose a date range :</label>

      <input type="daterange" class="daterange"
        ng-model="turbine.daterange"
        min-date="2011-05-27"
        max-date="<?= date("Y-m-d") ?>"
        format="DD/MM/YYYY"
        show-dropdowns="true">
    </div>

    <section id="about" turbine-about></section>

    <footer id="footer">
      <a title="Share on Facebook" class="social"
        href="http://www.facebook.com/sharer.php?u=<?= $url ?>">
        <img src="./static/img/fb.svg" alt="Share on Facebook"
          height="32" width="32">
      </a>

      <a title="Share on Twitter" class="twitter social"
        href="http://twitter.com/share?text=Winderful+-+visualising+UK's+%23windenergy+in+real+time.+Made+by+@diascreative&amp;url=<?= $url ?>">
        <img src="./static/img/twitter.svg" alt="Share on Twitter"
          height="32" width="32">
      </a>

      <a href="//diascreative.com" target="_blank">Made by DIAS_</a>
    </footer>

    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
    <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.2.26/angular.min.js"></script>
    <script src="./static/js/libs.js?v=<?= $version ?>"></script>
    <script src="./static/js/app.js?v=<?= $version ?>"></script>

    <script type="text/javascript">
      $('a.social').on('click', function(e) {
        e.preventDefault();

        var w = 600,
          h = 500,
          left = (screen.width/2) - (w/2),
          top = (screen.height/2) - (h/2),
          url = $(this).attr('href');

        window.open (url, 'win', 'menubar=0,resizable=1,width=' + w +
                                                    ', height=' + w + ', top=' + top + ', left=' + left);
      });

      $('.scroll-to').on('click', function(e) {
        var id = $(this).attr('href'),
          $scrollToItem = $(id);

        if( $scrollToItem.length ) {
          e.preventDefault();

          $('html, body').animate({
            scrollTop: $scrollToItem.offset().top
          }, 600);

        }
      });
      <?php if ( ANALYTICS ): ?>
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

      ga('create', '<?= ANALYTICS ?>', 'auto');
      ga('require', 'displayfeatures');
      ga('send', 'pageview');
      <?php endif; ?>
      </script>
  </body>
</html>
