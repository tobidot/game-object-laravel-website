<?php

use App\Models\GameSession;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMapFieldsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('map_fields', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(GameSession::class)->references('id')->on('game_sessions');
            $table->integer('x');
            $table->integer('y');
            $table->integer('base_type');
            $table->json('data');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('map_fields');
    }
}
