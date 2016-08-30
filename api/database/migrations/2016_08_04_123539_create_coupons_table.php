<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCouponsTable extends Migration
{
	public function up()
	{
		Schema::create('coupons', function(Blueprint $table) {
            $table->increments('id')->onDelete('cascade');
            $table->string('code');
            $table->decimal('value');
            $table->boolean('used')->default(0);
            $table->timestamps();
		});

		Schema::table('orders', function(Blueprint $table) {
            $table->integer('coupon_id')->unsigned()->nullable();
            $table->foreign('coupon_id')->references('id')->on('coupons')->onDelete('cascade');
		});
	}

	public function down()	{
		Schema::table('orders', function(Blueprint $table) {
            $table->dropForeign('orders_coupon_id_foreign');
            $table->dropColumn('coupon_id');
		});
		Schema::drop('coupons');
	}

}
