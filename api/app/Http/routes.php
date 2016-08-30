<?php

Route::get('/', function () {
	return view('welcome');
});

//API ------------------------------------------------------------------------------------------

Route::post('oauth/access_token', function() {
    return Response::json(Authorizer::issueAccessToken());
});

Route::group(['prefix' => 'api', 'middleware' => 'oauth', 'as' => 'api.'], function(){
	Route::group(['prefix' => 'clients', 'middleware' => 'oauth.checkrole:client', 'as' => 'client.'], function(){
		Route::resource('orders', 'Api\ClientCheckoutController', ['except' => ['create', 'edit', 'destroy']]);
	});

	Route::group(['prefix' => 'deliverymen', 'middleware' => 'oauth.checkrole:deliveryman', 'as' => 'deliverymen.'], function(){
		Route::resource('orders', 'Api\DeliverymanCheckoutController', ['except' => ['create', 'edit', 'destroy', 'store']]);
		Route::patch('orders/{id}/update-status', ['as' => 'orders.update-status', 'uses' => 'Api\DeliverymanCheckoutController@updateStatus']);
	});

	Route::group(['prefix' => 'users', 'as' => 'users.'], function(){
		Route::get('authenticated', ['as' => '.authenticated', 'uses' => 'Api\UsersController@authenticated']);
	});
});



//ADMIN ------------------------------------------------------------------------------------------

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


