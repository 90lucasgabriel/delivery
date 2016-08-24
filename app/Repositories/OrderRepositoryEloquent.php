<?php

namespace CodeDelivery\Repositories;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;
use CodeDelivery\Presenters\OrderPresenter;
use CodeDelivery\Repositories\OrderRepository;
use CodeDelivery\Models\Order;
use CodeDelivery\Validators\OrderValidator;

/**
 * Class OrderRepositoryEloquent
 * @package namespace CodeDelivery\Repositories;
 */
class OrderRepositoryEloquent extends BaseRepository implements OrderRepository
{
    protected $skipPresenter = true;

    public function getByIdAndDeliveryman($orderId, $deliverymanId){
        $result = $this->with(['client', 'coupon','items'])->findWhere([
            'id'                    => $orderId,
            'user_deliveryman_id'   => $deliverymanId
        ]);
        
        if($result instanceOf Collection){
            $result = $result->first();
        }
        else{
            if(isset($result['data']) && count($result['data'])==1){
                $result = [
                    'data' => $result['data'][0]
                ];
            }
            else{
                throw new ModelNotFoundException('Order nao existe');
            }
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

    public function presenter(){
        return OrderPresenter::class;
    }
}
