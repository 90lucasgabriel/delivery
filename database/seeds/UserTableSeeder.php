<?php

use Illuminate\Database\Seeder;
use CodeDelivery\Models\User;
use CodeDelivery\Models\Client;

class UserTableSeeder extends Seeder
{
    public function run()
    {
        User::truncate();
        factory(User::class)->create([
                'name' => 'Lucas Gabriel',
                'email' => '90lucasgabriel@gmail.com',
                'password' => bcrypt(123456),
                'remember_token' => str_random(10)
            ]);
        factory(User::class, 10)->create()->each(function($u){
            for($i=0; $i<5; $i++){
                $u->client()->save(factory(Client::class)->make());
            }
        });
    }
}
