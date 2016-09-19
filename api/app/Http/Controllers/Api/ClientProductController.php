<?php
namespace CodeDelivery\Http\Controllers\Api;

use CodeDelivery\Http\Controllers\Controller;
use CodeDelivery\Repositories\ProductRepository;

class ClientProductController extends Controller{
    private $productRepository;
    public function __construct(ProductRepository $productRepository){
        $this->productRepository    = $productRepository;
    }

    public function index(){
        $products = $this
            ->productRepository
            ->skipPresenter(false)
            ->all();

        return $products;
    }


    public function show($id)    {
        $product = $this
            ->productRepository         
            ->skipPresenter(false)
            ->find($id);
        
        return $product;
    }
}
