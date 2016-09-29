<?php

namespace CodeDelivery\Transformers;

use League\Fractal\TransformerAbstract;
use CodeDelivery\Models\Coupon;

/**
 * Class CouponTransformer
 * @package namespace CodeDelivery\Transformers;
 */
class CouponTransformer extends TransformerAbstract
{

    /**
     * Transform the \Coupon entity
     * @param \Coupon $model
     *
     * @return array
     */
    public function transform(Coupon $model)
    {
        return [
            'id'         => (int) $model->id,
            'code'       => $model->code,
            'value'      => (float) $model->value,
            'created_at' => $model->created_at,
            'updated_at' => $model->updated_at
        ];
    }
}
