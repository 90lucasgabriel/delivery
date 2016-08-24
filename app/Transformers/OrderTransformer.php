<?php
namespace CodeDelivery\Transformers;

use League\Fractal\TransformerAbstract;
use CodeDelivery\Models\Order;

class OrderTransformer extends TransformerAbstract
{
    protected $availableIncludes = ['client', 'coupon', 'items'];

    public function transform(Order $model)
    {
        return [
            'id'         => (int) $model->id,
            'total'      => (float) $model->total,
            'created_at' => $model->created_at,
            'updated_at' => $model->updated_at
        ];
    }

    public function includeClient(Order $model){
        return $this->item($model->client, new ClientTransformer());
    }

    public function includeCoupon(Order $model){
        if(!$model->coupon){
            return null;
        }
        return $this->item($model->coupon, new CouponTransformer());
    }

    public function includeItems(Order $model){
        return $this->collection($model->items, new OrderItemTransformer());
    }
}