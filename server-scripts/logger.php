<?php

const LOG_FOLDER = "./logs";

function cron_log(string $message)
{
    if (!file_exists(LOG_FOLDER)) {
        mkdir(LOG_FOLDER, 0777, false);
    }
    $log_file = LOG_FOLDER . "/" . date("Y_m_d") . "_cron.log";
    $content = "";
    if (file_exists($log_file)) {
        $content = file_get_contents($log_file);
    }
    $content .= date("[H:i:s] ") . $message . "\n";
    file_put_contents($log_file, $content);
}
