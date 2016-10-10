<?php
namespace CodeDelivery\Http\Controllers\Api;

use CodeDelivery\Http\Controllers\Controller;
use CodeDelivery\Events\GetLocationDeliveryman;
use CodeDelivery\Models\Geo;
use CodeDelivery\Repositories\OrderRepository;
use CodeDelivery\Repositories\UserRepository;
use CodeDelivery\Services\OrderService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use LucaDegasperi\OAuth2Server\Facades\Authorizer;

class DeliverymancheckoutController extends Controller{
    private $with = ['client', 'coupon', 'items'];
    private $orderRepository;
    private $userRepository;
    private $orderService;
    public function __construct(
        OrderRepository     $orderRepository,
        UserRepository      $userRepository,
        OrderService        $orderService
    ){
        $this->orderRepository      = $orderRepository;
        $this->userRepository       = $userRepository;
        $this->orderService         = $orderService;
    }

    public function index(){
        $id = Authorizer::getResourceOwnerId();
        $orders = $this->orderRepository
            ->skipPresenter(false)
            ->with($this->with)
            ->scopeQuery(function($query) use($id){
                return $query->where('user_deliveryman_id', '=', $id);
            }
        )->paginate();

        return $orders;
    }

    public function show($orderId){        
        $deliverymanId = Authorizer::getResourceOwnerId();
        return $this->orderRepository
            ->skipPresenter(false)
            ->getByIdAndDeliveryman($orderId, $deliverymanId);
    }

    public function updateStatus(Request $request, $orderId){
        $deliverymanId = Authorizer::getResourceOwnerId();
        return $order = $this->orderService->updateStatus($orderId, $deliverymanId, $request->get('status'));
    }

    public function geo(Request $request, Geo $geo, $id){
        $deliverymanId  = Authorizer::getResourceOwnerId();
        $order          = $this->orderRepository->getByIdAndDeliveryman($id, $deliverymanId);

        $geo->latitude  = $request->get('latitude');
        $geo->longitude = $request->get('longitude');

        event(new GetLocationDeliveryman($geo, $order));

        return $geo;
    }
}
