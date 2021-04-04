<?php

require_once "logger.php";

cron_log(__FILE__ . " triggered");

for ($i = 0; $i < 10; ++$i) {
    $result = exec("php ./cron-run.php");
    sleep(60);
}
