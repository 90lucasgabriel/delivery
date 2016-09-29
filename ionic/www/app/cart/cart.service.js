(function () {
  "use strict";

  angular
    .module('app.cart')
    .factory('$cart', $cart);

  $cart.$inject = ['$localStorage'];

  function $cart($localStorage){
    var key     = 'cart';
    var cartAux = $localStorage.getObject(key);
    
	activate();


    var service = {
      get            : get,
      clear          : clear,
      getItem        : getItem,
      getItemById    : getItemById,
      addItem        : addItem,
      removeItem     : removeItem,
      updateQuantity : updateQuantity,
      getTotal       : getTotal,
      setCoupon      : setCoupon,
      removeCoupon   : removeCoupon,
    };

    return service;



    //-------------------------------
    function get(){
    	return $localStorage.getObject(key);
    }

    function clear(){
    	$localStorage.setObject(key,{
    		items: [],
    		total: 0,
            coupon: {
                code: null,
                value: null
            }
    	});
    }

    function getItem(i){
    	return get().items[i];
    }

    function getItemById(id){
        var cart = get();
        var i    = false;

        angular.forEach(cart.items, function(item){
            if(item.id == id){
                i = item;
            }
        });
        
        return i;
    }

    function addItem(item){
        var cart      = get();
        var exists    = false;
    	var itemAux;

        angular.forEach(cart.items, function(i){
            itemAux = i;
            if(itemAux.id == item.id){
                itemAux.quantity = item.quantity + itemAux.quantity;
                itemAux.subtotal = subTotal(itemAux);
                exists           = true;
            }
        });

    	if(!exists){
    		item.subtotal = subTotal(item);
    		cart.items.push(item);
    	}
    	cart.total = getSubtotalSum(cart.items);
    	$localStorage.setObject(key, cart);
    }

    function removeItem(item){
    	var cart = get();
    	cart.items.splice(cart.items.indexOf(item), 1);
    	cart.total = getSubtotalSum(cart.items);
    	$localStorage.setObject(key, cart);
    }

    function updateQuantity(item, quantity){
    	var cart = get();
        var itemAux;
        
        //Verificando se o item existe no carrinho;
        angular.forEach(cart.items, function(i){
            if(i.id == item.id){
                itemAux = i;
            }
        });

        itemAux.quantity = quantity;
        itemAux.subtotal = subTotal(itemAux);
        cart.total = getSubtotalSum(cart.items);
        $localStorage.setObject(key, cart);
    }


    //Coupon
    function getTotal(){
        var cart = this.get();
        return cart.total - (cart.coupon.value || 0);
    }

    function setCoupon(code, value){
        var cart = this.get();
        cart.coupon = {
            code: code,
            value: value
        };

        $localStorage.setObject(key, cart);
    }

    function removeCoupon(){
        var cart = this.get();
        cart.coupon = {
            code: null,
            value: null
        };

        $localStorage.setObject(key, cart);
    }



    //Private functions ---------------------------------
    function activate(){
	    if(!cartAux){
	    	clear();
	    }
    }

    function subTotal(item){
    	return item.price * item.quantity;
    }

    function getSubtotalSum(items){
    	var sum = 0;
    	angular.forEach(items, function(item){
			sum += item.subtotal;
    	});

    	return sum;
    }
  };

})();