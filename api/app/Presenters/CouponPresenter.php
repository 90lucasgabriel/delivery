<?php

namespace CodeDelivery\Presenters;

use CodeDelivery\Transformers\CouponTransformer;
use Prettus\Repository\Presenter\FractalPresenter;

/**
 * Class CouponPresenter
 *
 * @package namespace CodeDelivery\Presenters;
 */
class CouponPresenter extends FractalPresenter
{

    public function getTransformer()
    {
        return new CouponTransformer();
    }
}
