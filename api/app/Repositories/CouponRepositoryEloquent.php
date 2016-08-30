<?php

namespace CodeDelivery\Repositories;

use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;
use CodeDelivery\Repositories\CouponRepository;
use CodeDelivery\Models\Coupon;
use CodeDelivery\Validators\CouponValidator;

/**
 * Class CouponRepositoryEloquent
 * @package namespace CodeDelivery\Repositories;
 */
class CouponRepositoryEloquent extends BaseRepository implements CouponRepository
{
    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return Coupon::class;
    }

    

    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app(RequestCriteria::class));
    }
}
