<?php
namespace CodeDelivery\Http\Controllers;

use CodeDelivery\Repositories\OrderRepository;
use CodeDelivery\Repositories\ProductRepository;
use CodeDelivery\Repositories\UserRepository;
use CodeDelivery\Services\OrderService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class CheckoutController extends Controller{
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
        $clientId = $this->userRepository->find(Auth::user()->id)->client->id;
        $orders = $this->orderRepository->scopeQuery(function($query) use($clientId){
            return $query->where('client_id', '=', $clientId);
        })->paginate();

        return view('customer.orders.index', compact('orders'));
    }

    public function create(){        
    	$products = $this->productRepository->all();
    	return view('customer.orders.create', compact('products'));
    }

    public function store(Request $request){
        $data = $request->all();
        $clientId = $this->userRepository->find(Auth::user()->id)->client->id;
        $data['client_id'] = $clientId;
        $this->orderService->create($data);

        return redirect()->route('customer.orders.index');
    }
}
