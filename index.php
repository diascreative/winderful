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

    <link href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDE0IDc5LjE1Njc5NywgMjAxNC8wOC8yMC0wOTo1MzowMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDBDMDQ2RjQ1REYxMTFFNDk2RjdBOTM3RDA1ODYwOEYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDBDMDQ2RjU1REYxMTFFNDk2RjdBOTM3RDA1ODYwOEYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo0MEMwNDZGMjVERjExMUU0OTZGN0E5MzdEMDU4NjA4RiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo0MEMwNDZGMzVERjExMUU0OTZGN0E5MzdEMDU4NjA4RiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pq6uEZAAAAazSURBVHja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 rel="icon" type="image/x-icon" />

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
    <script src="./static/js/libs.js"></script>
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
