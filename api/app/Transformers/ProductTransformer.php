<?php
namespace CodeDelivery\Transformers;

use League\Fractal\TransformerAbstract;
use CodeDelivery\Models\Product;

class ProductTransformer extends TransformerAbstract
{
    
    public function transform(Product $model)
    {
        return [
            'id'         => (int) $model->id,
            'name'       => $model->name,
            'price'      => $model->price,
            'description'=> $model->description,
            'created_at' => $model->created_at,
            'updated_at' => $model->updated_at
        ];
    }

}