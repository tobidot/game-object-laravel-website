<?php

namespace App\Console\Commands;

use App\Models\GameSession;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class GameStep extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'game:step';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Evaluates games for one step';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        GameSession::query()->get()->each(function (GameSession $gameSession) {
            /**
             * @var Carbon $created_at
             */
            Log::info("Schedule at ", ['now' => now()]);
            $created_at = $gameSession->created_at;
            if (now()->greaterThan($created_at->addMinutes(120))) {
                echo "Session $gameSession->id closed \n";
                $gameSession->delete();
            }
        });
        return 0;
    }
}
