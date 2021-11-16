<?php
header('Access-Control-Allow-Origin: *');
$AQI=file_get_contents("https://data.epa.gov.tw/api/v1/aqx_p_432?format=json&limit=100&api_key=39e7e545-e563-4395-ba6a-0aa7af4a078b"); //$jsonfile=file_get_contents(url);
$w_np=file_get_contents("https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0001-001?Authorization=CWB-1BFEDE3C-7DE9-4A8D-AAD0-34EAC563AD22&format=JSON"); //$jsonfile=file_get_contents(url);
$w_p=file_get_contents("https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=CWB-1BFEDE3C-7DE9-4A8D-AAD0-34EAC563AD22&format=JSON"); //$jsonfile=file_get_contents(url);

$host        = "host=127.0.0.1";
$port        = "port=5432";
$dbname      = "dbname=SN";
$credentials = "user=amy password=0000";



$db = pg_connect( "$host $port $dbname $credentials"  );

$AQIdata = json_decode($AQI, TRUE);
$AQIdata = $AQIdata["records"];
$wpdata = json_decode($w_p, TRUE);
$wpdata=$wpdata["records"]["location"];
$wnpdata = json_decode($w_np, TRUE);
$wnpdata=$wnpdata["records"]["location"];
foreach($AQIdata as $key=>$item){
    $site_now='';
    $aqi_v=0;
    $status_s='';
    foreach($item as $tkey=>$subitem){
      if($tkey=='SiteName'){  
        $site_now=$subitem;
      }
      if($tkey=='AQI'){  
        $aqi_v=(int) $subitem;
      }
      if($tkey=='Status'){  
        $status_s=$subitem;
      }
    }
    $query="UPDATE air_wea.air 
        SET (aqi,status) = 
        ('$aqi_v','$status_s')
        WHERE sid= '$site_now'";
    $res = pg_query($db, $query);
  }

foreach($wpdata as $key=>$item){
    $site_now='';
    $temp_v=0.0;
    $humd_v=0.0;
    $status_s='-';
    foreach($item as $tkey=>$subitem){
      if($tkey=='stationId'){  
        $site_now=$subitem;
      }
      if($tkey=="weatherElement"){
          foreach($subitem as $smallkey=>$subsubitem){
              if($subsubitem["elementName"]=='TEMP'){
                $temp_v=(float)$subsubitem["elementValue"];
              }
              else if($subsubitem["elementName"]=='HUMD'){
                $humd_v=(float)$subsubitem["elementValue"];
              }
              else if($subsubitem["elementName"]=='Weather'){
                $status_s=$subsubitem["elementValue"];
              }
          }
      }
    }
    $query="UPDATE air_wea.weather
        SET (temp,humd,weather) = 
        ('$temp_v','$humd_v','$status_s')
        WHERE sid= '$site_now'";
    $res = pg_query($db, $query);
  }

  foreach($wnpdata as $key=>$item){
    $site_now='';
    $temp_v=0.0;
    $humd_v=0.0;
    $status_s='';
    foreach($item as $tkey=>$subitem){
      if($tkey=='stationId'){  
        $site_now=$subitem;
      }
      if($tkey=="weatherElement"){
          foreach($subitem as $smallkey=>$subsubitem){
              if($subsubitem["elementName"]=='TEMP'){
                $temp_v=(float)$subsubitem["elementValue"];
              }
              else if($subsubitem["elementName"]=='HUMD'){
                $humd_v=(float)$subsubitem["elementValue"];
              }
          }
      }
    }
    if($humd_v>=0.7){
      $status_s=$status_s."濕";
    }
    else if($humd_v<=0.3){
      $status_s=$status_s."乾";
    }
    if($temp_v>=30){
      $status_s=$status_s."熱";
    }
    else if($temp_v<=15){
      $status_s=$status_s."冷";
    }
    if($status_s==""){
      $status_s="普通";
    }
    $query="UPDATE air_wea.weather
        SET (temp,humd,weather) = 
        ('$temp_v','$humd_v','$status_s')
        WHERE sid= '$site_now'";
    $res = pg_query($db, $query);
  }
  if ($res) {
    echo 200;
} else {
    echo "error";
}
?>
