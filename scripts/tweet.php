<?php
  error_reporting(0);

  require_once( dirname(__FILE__) . '/../inc/init.php' );
  require_once( dirname(__FILE__) . '/../inc/twitter/twitteroauth.php' );

  // get latest power power
  $query = fetchAssoc(query("SELECT
              timestamp,
              demand,
              wind
            FROM
              wind_vs_demand
            ORDER BY
              timestamp DESC
            LIMIT 1"));

  echo $query['wind'];