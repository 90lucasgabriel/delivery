<?php

namespace CodeDelivery\Models;

use Illuminate\Database\Eloquent\Model;
use Prettus\Repository\Contracts\Transformable;
use Prettus\Repository\Traits\TransformableTrait;

class OauthClient extends Model implements Transformable
{
    use TransformableTrait;

    protected $fillable = [
        'id',
        'secret', 
        'name'
    ];
}