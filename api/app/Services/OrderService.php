<?php
namespace CodeDelivery\Services;

use CodeDelivery\Http\Requests;
use CodeDelivery\Repositories\CouponRepository;
use CodeDelivery\Repositories\OrderRepository;
use CodeDelivery\Repositories\ProductRepository;
use CodeDelivery\Models\Order;

class OrderService{
    private $couponRepository;
    private $orderRepository;
    private $productRepository;
    public function __construct(
        CouponRepository $couponRepository,
        OrderRepository $orderRepository, 
        ProductRepository $productRepository
        ){
        $this->couponRepository = $couponRepository;
        $this->orderRepository = $orderRepository;
        $this->productRepository = $productRepository;
    }

    public function create(array $data){
        \DB::beginTransaction();
        try{
            $data['status'] = 0;

            if(isset($data['coupon_id'])){
                unset($data['coupon_id']);
            }

            if(isset($data['coupon_code'])){
                $coupon = $this->couponRepository->findByField('code', $data['coupon_code'])->first();
                $data['coupon_id'] = $coupon->id;
                $coupon->used = 1;
                $coupon->save();
                unset($data['coupon_code']);
            }
            $items = $data['items'];
            unset($data['items']);

            $order = $this->orderRepository->create($data);
            $total = 0;

            foreach($items as $item){
                $item['price'] = $this->productRepository->find($item['product_id'])->price;
                $order->items()->create($item);
                $total += $item['price'] * $item['quantity'];
            }

            $order->total = $total;
            if(isset($coupon)){
                $order->total = $total - $coupon->value;
            }
            $order->save();
            \DB::commit();

            return $order;
        }
        catch(\Exception $e){
            \DB::rollback();
            throw $e;
        }
    }

    public function updateStatus($orderId, $deliverymanId, $status){
        $order = $this->orderRepository->getByIdAndDeliveryman($orderId, $deliverymanId);
        $order->status = $status;
        if((int)($order->status) == 1 && !$order->hash){
            $order->hash = md5((new \DateTime())->getTimestamp());
        }
        $order->save();

        return $order;
    }
}