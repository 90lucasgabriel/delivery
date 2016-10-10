<?php

namespace CodeDelivery\Models;

use Illuminate\Contracts\Support\Jsonable;

class Geo implements Jsonable
{
    public $latitude;
    public $longitude;

    public function toJson($options=0){
        return json_encode([
            'latitude'  => $this->latitude,
            'longitude' => $this->longitude
        ]);
    }
}