<?php

namespace CodeDelivery\Repositories;

use Illuminate\Database\Eloquent\Collection;
use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;
use CodeDelivery\Repositories\OrderRepository;
use CodeDelivery\Models\Order;
use CodeDelivery\Validators\OrderValidator;

/**
 * Class OrderRepositoryEloquent
 * @package namespace CodeDelivery\Repositories;
 */
class OrderRepositoryEloquent extends BaseRepository implements OrderRepository
{

    public function getByIdAndDeliveryman($orderId, $deliverymanId){
        $result = $this->with(['client', 'coupon','items'])->findWhere([
            'id'                    => $orderId,
            'user_deliveryman_id'   => $deliverymanId
        ]);
        
        $result = $result->first();
        if($result){
            $result->items->each(function($item){
                $item->product;
            });
        }

        return $result;
    }

    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return Order::class;
    }

    

    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app(RequestCriteria::class));
    }
}
