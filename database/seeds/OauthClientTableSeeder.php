<?php

use Illuminate\Database\Seeder;
use CodeDelivery\Models\OauthClient;

class OauthClientTableSeeder extends Seeder
{
    public function run()
    {
        OauthClient::truncate();
        factory(OauthClient::class)->create([
            "id"	=>"appId1", 
            "secret"=>"secret", 
            "name"	=>"Delivery"
        ]);
        //factory(OauthClient::class, 10)->create();   
    }
}