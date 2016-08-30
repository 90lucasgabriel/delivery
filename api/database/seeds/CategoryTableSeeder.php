<?php

use Illuminate\Database\Seeder;
use CodeDelivery\Models\Category;
use CodeDelivery\Models\Product;

class CategoryTableSeeder extends Seeder
{
    public function run()
    {
        factory(Category::class, 10)->create()->each(function($c){
            for($i=0; $i<5; $i++){
                $c->products()->save(factory(Product::class)->make());
            }
        });
    }
}