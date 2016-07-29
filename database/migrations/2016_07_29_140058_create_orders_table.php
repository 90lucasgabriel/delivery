
<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOrdersTable extends Migration
{
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->increments('id')->onDelete('cascade');
            $table->integer('client_id')->unsigned();
            $table->integer('user_deliveryman_id')->unsigned()->nullable();
            $table->decimal('total');
            $table->smallInteger('status')->default(0);
            $table->timestamps();
            
            $table->foreign('client_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('user_deliveryman_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::drop('orders');
    }
}
