<?php
namespace CodeDelivery\Transformers;

use League\Fractal\TransformerAbstract;
use CodeDelivery\Models\Order;
use Illuminate\Database\Eloquent\Collection;

class OrderTransformer extends TransformerAbstract
{
    protected $availableIncludes = ['client', 'coupon', 'deliveryman', 'items'];

    public function transform(Order $model)
    {
        return [
            'id'            => (int) $model->id,
            'total'         => (float) $model->total,
            'product_names' => $this->getProductNames($model->items),
            'status'        => $model->status,
            'created_at'    => $model->created_at,
            'updated_at'    => $model->updated_at
        ];
    }


    public function includeClient(Order $model){
        return $this->item($model->client, new ClientTransformer());
    }

    public function includeDeliveryman(Order $model){
        return $this->item($model->deliveryman, new DeliverymanTransformer());
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



    protected function getProductNames(Collection $items){
        $names = [];
        foreach($items as $item){
            $names[] = $item->product->name;
        }

        return $names;
    }
}