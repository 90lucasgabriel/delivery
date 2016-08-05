<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
	return view('welcome');
});


Route::group(['prefix' => 'admin', 'middleware' => 'auth.checkrole:admin', 'as' => 'admin.'], function(){
	Route::group(['prefix' => 'categories', 'as' => 'categories.'], function(){
		Route::get('edit/{id}', 	['as' => 'edit', 	'uses' => 'CategoriesController@edit']);
		Route::post('update/{id}', 	['as' => 'update', 	'uses' => 'CategoriesController@update']);
		Route::get('create', 		['as' => 'create', 	'uses' => 'CategoriesController@create']);
		Route::post('store', 		['as' => 'store', 	'uses' => 'CategoriesController@store']);
		Route::get('', 				['as' => 'index', 	'uses' => 'CategoriesController@index']);
	});

	Route::group(['prefix' => 'clients', 'as' => 'clients.'], function(){
		Route::get('edit/{id}', 	['as' => 'edit', 	'uses' => 'ClientsController@edit']);
		Route::post('update/{id}', 	['as' => 'update', 	'uses' => 'ClientsController@update']);
		Route::get('destroy/{id}', 	['as' => 'destroy',	'uses' => 'ClientsController@destroy']);
		Route::get('create', 		['as' => 'create', 	'uses' => 'ClientsController@create']);
		Route::post('store', 		['as' => 'store', 	'uses' => 'ClientsController@store']);
		Route::get('', 				['as' => 'index', 	'uses' => 'ClientsController@index']);
	});

	Route::group(['prefix' => 'coupons', 'as' => 'coupons.'], function(){
		Route::get('edit/{id}', 	['as' => 'edit', 	'uses' => 'CouponsController@edit']);
		Route::post('update/{id}', 	['as' => 'update', 	'uses' => 'CouponsController@update']);
		Route::get('destroy/{id}', 	['as' => 'destroy',	'uses' => 'CouponsController@destroy']);
		Route::get('create', 		['as' => 'create', 	'uses' => 'CouponsController@create']);
		Route::post('store', 		['as' => 'store', 	'uses' => 'CouponsController@store']);
		Route::get('', 				['as' => 'index', 	'uses' => 'CouponsController@index']);
	});

	Route::group(['prefix' => 'orders', 'as' => 'orders.'], function(){
		Route::get('edit/{id}', 	['as' => 'edit', 	'uses' => 'OrdersController@edit']);
		Route::post('update/{id}', 	['as' => 'update', 	'uses' => 'OrdersController@update']);
		Route::get('destroy/{id}', 	['as' => 'destroy',	'uses' => 'OrdersController@destroy']);
		Route::get('', 				['as' => 'index', 	'uses' => 'OrdersController@index']);
	});

	Route::group(['prefix' => 'products', 'as' => 'products.'], function(){
		Route::get('edit/{id}', 	['as' => 'edit', 	'uses' => 'ProductsController@edit']);
		Route::post('update/{id}', 	['as' => 'update', 	'uses' => 'ProductsController@update']);
		Route::get('destroy/{id}', 	['as' => 'destroy',	'uses' => 'ProductsController@destroy']);
		Route::get('create', 		['as' => 'create', 	'uses' => 'ProductsController@create']);
		Route::post('store', 		['as' => 'store', 	'uses' => 'ProductsController@store']);
		Route::get('', 				['as' => 'index', 	'uses' => 'ProductsController@index']);
	});
});

Route::group(['prefix' => 'customer', 'middleware' => 'auth.checkrole:client', 'as' => 'customer.'], function(){
	Route::group(['prefix' => 'orders', 'as' => 'orders.'], function(){
		Route::get('edit/{id}', 	['as' => 'edit', 	'uses' => 'CheckoutController@edit']);
		Route::post('update/{id}', 	['as' => 'update', 	'uses' => 'CheckoutController@update']);
		Route::get('create', 		['as' => 'create', 	'uses' => 'CheckoutController@create']);
		Route::post('store', 		['as' => 'store', 	'uses' => 'CheckoutController@store']);
		Route::get('', 				['as' => 'index', 	'uses' => 'CheckoutController@index']);
	});
});