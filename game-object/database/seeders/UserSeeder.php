<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = new User();
        $user->name = "Tobi";
        $user->email = "object.name@live.de";
        $user->password = bcrypt('1q"W3e$R');
        $user->save();
    }
}
