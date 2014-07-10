<!DOCTYPE HTML>
<html>
<head>
  <link rel="stylesheet" type="text/css" href="css/jquery.datetimepicker.css"/ >
  <link rel="stylesheet" type="text/css" href="css/wind.css">
  <title>Wind Power Supply</title>
</head>
 <body>
  <form id="dates" action="download.php" method="post">
    <label for= "datetimepicker_start">Start Date</label>
    <input id="datetimepicker_start" type="text" name="datetimepicker_start"><br>
    <label for= "datetimepicker_end">End Date</label>
    <input id="datetimepicker_end" type="text" name="datetimepicker_end"><br>
    <input type="submit">
  </form>
 <ul></ul>
  <div class="turbine">
    <div class="rotor">
      <div class="rotor-blade blade1"></div>
      <div class="rotor-blade blade2"></div>
      <div class="rotor-blade blade3"></div>
      <div class="rotor-tip"></div>
    </div>
  <div class="mast"></div>
</div>
</body>
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
<script src="js/jquery.datetimepicker.js"></script>
<script type="text/javascript" src="js/script.js"></script>
</html>