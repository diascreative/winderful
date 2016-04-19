<?php
require_once dirname(__FILE__) . '/../inc/init.php';

// set timezone to the same as gridwatch's
date_default_timezone_set('GMT');

$lastTimes = fetchArray(query("SELECT timestamp FROM wind_vs_demand ORDER BY timestamp DESC LIMIT 1"));

$startTime = strtotime($lastTimes[0]);
$endTime   = time();

if ($endTime - $startTime < 60 * 5) {
  echo 'up to date';
  return;
}

$remoteFile = 'http://www.gridwatch.templar.co.uk/do_download.php';
//curl 'http://www.gridwatch.templar.co.uk/do_download.php' -H 'Pragma: no-cache' -H 'Origin: http://www.gridwatch.templar.co.uk' -H 'Accept-Encoding: gzip, deflate' -H 'Accept-Language: en-US,en;q=0.8,es;q=0.6' -H 'Upgrade-Insecure-Requests: 1' -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.86 Safari/537.36' -H 'Content-Type: application/x-www-form-urlencoded' -H 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8' -H 'Cache-Control: no-cache' -H 'Referer: http://www.gridwatch.templar.co.uk/download.php' -H 'Connection: keep-alive' -H 'DNT: 1'
// --data 'none=off&demand=on&frequency=on&coal=on&nuclear=on&ccgt=on&wind=on&pumped=on&hydro=on&other=on&oil=on&ocgt=on&french_ict=on&dutch_ict=on&irish_ict=on&ew_ict=on&all=off
//&starthour=10&startminute=15&startday=3&startmonth=11&startyear=2015&endhour=10&endminute=15&endday=4&endmonth=11&endyear=2015' --compressed
$fields = array(
  'none'        => 'off',
  'demand'      => 'on',
  'frequency'   => 'off',
  'coal'        => 'off',
  'nuclear'     => 'off',
  'ccgt'        => 'off',
  'wind'        => 'on',
  'pumped'      => 'off',
  'hydro'       => 'off',
  'other'       => 'off',
  'oil'         => 'off',
  'ocgt'        => 'off',
  'french_ict'  => 'off',
  'dutch_ict'   => 'off',
  'irish_ict'   => 'off',
  'ew_ict'      => 'off',
  'all'         => 'off',
  'starthour'   => date('G', $startTime),
  'startminute' => date('i', $startTime),
  'startday'    => date('j', $startTime),
  'startmonth'  => strval(date('n', $startTime) - 1), // month is 0->11
  'startyear'   => date('Y', $startTime),
  'endhour'     => date('G', $endTime),
  'endminute'   => date('i', $endTime),
  'endday'      => date('j', $endTime),
  'endmonth'    => strval(date('n', $endTime) - 1), // month is 0->11
  'endyear'     => date('Y', $endTime)
);

$data = curl_init($remoteFile);

curl_setopt($data, CURLOPT_HTTPHEADER, array(
  'Origin: http://www.gridwatch.templar.co.uk',
  'Referer: http://www.gridwatch.templar.co.uk/download.php'));

curl_setopt($data, CURLOPT_POST, true);
curl_setopt($data, CURLOPT_POSTFIELDS, $fields);
curl_setopt($data, CURLOPT_RETURNTRANSFER, true);
curl_setopt($data, CURLOPT_FOLLOWLOCATION, true);

$csv = curl_exec($data);

curl_close($data);

// Do it
$lines = explode("\n", $csv);
$head  = str_getcsv(array_shift($lines));
$head  = array_map('trim', $head);

$data = array();

foreach ($lines as $line) {
  if ($line) {
    $data[] = array_combine($head, array_map('trim', str_getcsv($line)));
  }

}

$sql = array();

foreach ($data as $row) {
  $sql[] = '("' . es($row['timestamp']) . '", "' . es($row['demand']) . '", "' . es($row['wind']) . '")';
}

query("INSERT INTO wind_vs_demand (timestamp, demand, wind) VALUES " . implode(',', $sql));
