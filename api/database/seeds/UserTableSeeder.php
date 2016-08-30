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
            'role' => 'admin',
            'password' => bcrypt(123456),
            'remember_token' => str_random(10)
        ])->client()->save(factory(Client::class)->make());
        factory(User::class)->create([
            'name' => 'Gabriel Teixeira',
            'email' => 'admin@email.com',
            'role' => 'admin',
            'password' => bcrypt(123456),
            'remember_token' => str_random(10)
        ])->client()->save(factory(Client::class)->make());
        factory(User::class)->create([
            'name' => 'Client User',
            'email' => 'user@email.com',
            'password' => bcrypt(123456),
            'remember_token' => str_random(10)
        ])->client()->save(factory(Client::class)->make());
        factory(User::class, 10)->create()->each(function($u){
            $u->client()->save(factory(Client::class)->make());
        });
        factory(User::class)->create([
            'name' => 'Delivery Man',
            'email' => 'deliveryman@email.com',
            'role' => 'deliveryman',
            'password' => bcrypt(123456),
            'remember_token' => str_random(10)
        ]);
        factory(User::class, 3)->create([
            'role' => 'deliveryman',
        ]);
    }
}
