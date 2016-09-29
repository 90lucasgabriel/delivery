<?php
namespace CodeDelivery\Http\Controllers\Api;

use CodeDelivery\Http\Controllers\Controller;
use CodeDelivery\Repositories\CouponRepository;

class CouponsController extends Controller{
    private $couponRepository;
    public function __construct(CouponRepository $couponRepository){
        $this->couponRepository    = $couponRepository;
    }

    public function findByCode($code)    {
        $coupon = $this
            ->couponRepository         
            ->skipPresenter(false)
            ->findByCode($code);
        
        return $coupon;
    }
}
