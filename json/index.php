<?php
  require_once('../inc/init.php');
  header('Content-type: application/json');

  error_reporting(0);

  // set timezone to the same as gridwatch's
  date_default_timezone_set('GMT');

  // set up the end limited
  if( isset($_GET['end']) )
    $end = $_GET['end'];
  else
    $end = time() - (3600*48);

  // set up the start limited
  if( isset($_GET['start']) )
    $start = $_GET['start'];
  else
    $start = $end - 3600*24*6; // show 10h before end

  $delta = $end - $start;

  $group_by = '';
  $time = "timestamp AS time";

  if( $delta <= 3600*10 ) {
    // date range < 10 hours : show every 5 mins
    $group_by = '';
  } else if( $delta <= 3600 * 24 * 7 ) {
    // date range < 1 week : show every hour
    $time = "CONCAT(DATE(timestamp), ' : ', HOUR(timestamp)) AS time";
    $group_by = ' GROUP BY time';
  } else if( $delta <= 3600 * 24 * 30 ) {
    // date range < 1 month : show daily average
    $time = "DATE(timestamp) AS time";
    $group_by = ' GROUP BY time';
  } else {
    // date range < 1 year : show weekly average
    $time = "CONCAT(YEAR(timestamp), '-', WEEK(timestamp)) AS time";
    $group_by = ' GROUP BY time';
  }

  $end = es($end);
  $start = es($start);

  $dateSMYSQL = es(date("Y-m-d H:i", $start));
  $dateEMYSQL = es(date("Y-m-d H:i", $end));

  $query = "SELECT
              $time,
              timestamp,
              demand,
              wind
            FROM
              wind_vs_demand
            WHERE
              timestamp BETWEEN '$dateSMYSQL' AND '$dateEMYSQL'
              $group_by
            ORDER BY
              timestamp";

  $wind = array();
  $demand = array();

  $results = query($query);

  while( $item = fetchAssoc($results) ) {
    $windItem = array();
    $demandItem = array();

    $windItem['x'] = strtotime($item['timestamp']);
    $windItem['y'] = intval($item['wind']);

    $demandItem['x'] = strtotime($item['timestamp']);
    $demandItem['y'] = intval($item['demand']);

    array_push($wind, $windItem);
    array_push($demand, $demandItem);
  }

  $graph = array(
      array('name' => "Wind", "data" => $wind),
      array('name' => "Demand", "data" => $demand)
    );

  echo json_encode($graph);

  //print_r($dbDebug);