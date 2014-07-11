<?php

$dbDebug = array(
    'log' => array(),
    'time' => array(),
    'rows' => array(),
    'total' => 0
  );

$db = mysqli_connect('p:' . DB_ADDR, DB_USER, DB_PASS, DB_NAME);

if (mysqli_connect_errno()) {
  die("Could not connect to database server.\n");
}

mysqli_set_charset($db, 'utf8');

function fetchArray($result, $result_type=MYSQLI_NUM) {
  return mysqli_fetch_array($result, $result_type);
}

function fetchAssoc($result) {
  return mysqli_fetch_assoc($result);
}

function affectedRows() {
  global $db;
  return mysqli_affected_rows($db);
}

function insertId() {
  global $db;
  return mysqli_insert_id($db);
}

function numRows($result) {
  return mysqli_num_rows($result);
}

function fetchRow($result) {
  return mysqli_fetch_row($result);
}

function query($query) {
  global $db, $dbDebug;

  $db_start = microtime(true);
  $result = mysqli_query($db, $query);
  $db_end = microtime(true);

  $db_time = round(($db_end - $db_start)*1000, 6);
  $dbDebug['total'] = $dbDebug['total'] + $db_time;

  array_push($dbDebug['log'], $query);
  array_push($dbDebug['time'], $db_time);
  array_push($dbDebug['rows'], affectedRows());

  return $result;
}

function es($str) {
  global $db;
  return mysqli_real_escape_string($db, $str);
}