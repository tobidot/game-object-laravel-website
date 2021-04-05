<?php

require_once "logger.php";

exec("php ./game-object/artisan schedule:run >> /dev/null 2>&1");

cron_log(__FILE__ . " triggered");
