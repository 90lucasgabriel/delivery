<?php
namespace CodeDelivery\Transformers;

use League\Fractal\TransformerAbstract;
use CodeDelivery\Models\User;

class UserTransformer extends TransformerAbstract
{
    
    public function transform(User $model)
    {
        return [
            'id'         => (int) $model->id,
            'name'       => $model->name,
            'email'      => $model->email,
            'role'       => $model->role,
            'created_at' => $model->created_at,
            'updated_at' => $model->updated_at
        ];
    }

}