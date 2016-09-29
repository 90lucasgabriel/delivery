<?php

namespace CodeDelivery\Repositories;

use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;
use CodeDelivery\Repositories\CouponRepository;
use CodeDelivery\Models\Coupon;
use CodeDelivery\Presenters\CouponPresenter;
use CodeDelivery\Validators\CouponValidator;
use Illuminate\Database\Eloquent\ModelNotFoundException;

/**
 * Class CouponRepositoryEloquent
 * @package namespace CodeDelivery\Repositories;
 */
class CouponRepositoryEloquent extends BaseRepository implements CouponRepository
{
    protected $skipPresenter = true;
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

    public function presenter(){
        return CouponPresenter::class;
    }

    public function findByCode($code){
        $result = $this->model
            ->where('code', $code)
            ->where('used', 0)
            ->first();

        if($result){
            return $this->parserResult($result);
        }
        else{
            throw (new ModelNotFoundException)->setModel(get_class($this->model));
        }
    }
}
