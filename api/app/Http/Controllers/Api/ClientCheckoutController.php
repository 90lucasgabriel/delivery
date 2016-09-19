<?php
namespace CodeDelivery\Http\Controllers\Api;

use CodeDelivery\Http\Controllers\Controller;
use CodeDelivery\Http\Requests\CheckoutRequest;
use CodeDelivery\Repositories\OrderRepository;
use CodeDelivery\Repositories\ProductRepository;
use CodeDelivery\Repositories\UserRepository;
use CodeDelivery\Services\OrderService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use LucaDegasperi\OAuth2Server\Facades\Authorizer;

class ClientCheckoutController extends Controller{
    private $with = ['client', 'coupon', 'items'];
    private $orderRepository;
    private $productRepository;
    private $userRepository;
    private $orderService;
    public function __construct(
        OrderRepository     $orderRepository,
        ProductRepository   $productRepository,
        UserRepository      $userRepository,
        OrderService        $orderService
    ){
        $this->orderRepository      = $orderRepository;
        $this->productRepository    = $productRepository;
        $this->userRepository       = $userRepository;
        $this->orderService         = $orderService;
    }

    public function index(){
        $id = Authorizer::getResourceOwnerId();
        $clientId = $this->userRepository->find($id)->client->id;
        $orders = $this
            ->orderRepository
            ->skipPresenter(false)
            ->with($this->with)
            ->scopeQuery(function($query) use($clientId){
                return $query->where('client_id', '=', $clientId);
            }
        )->paginate();

        return $orders;
    }

    public function store(CheckoutRequest $request){
        $data = $request->all();

        $id = Authorizer::getResourceOwnerId();
        $clientId = $this->userRepository->find($id)->client->id;
        $data['client_id'] = $clientId;
        
        $order = $this->orderService->create($data);
        $order = $this->orderRepository->skipPresenter(false)->with($this->with)->find($order->id);

        return $order;
    }

    public function show($id){
        $order = $this->orderRepository->skipPresenter(false)->with($this->with)->find($id);
        return $order;
    }

    public function authenticated(){
        $id = Authorizer::getResourceOwnerId();
        $user = $this->userRepository->find($id);        

        return $user;
    }
}
